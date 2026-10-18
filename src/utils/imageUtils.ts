/**
 * Utility functions for image detection, formatting, and Base64 conversion.
 */

export type ImageSourceType = 'base64' | 'url' | 'empty';

export interface ImageSourceInfo {
  type: ImageSourceType;
  label: string;
  badgeClass: string;
  icon: 'link' | 'image' | 'alert';
}

/**
 * Detects whether a string is a Base64 image, a Web URL, or empty.
 */
export function detectImageSource(src?: string | null): ImageSourceType {
  if (!src || typeof src !== 'string') return 'empty';
  const trimmed = src.trim();
  if (!trimmed) return 'empty';

  // Standard data URI pattern: data:image/[type];base64,...
  if (trimmed.startsWith('data:image/') || /^data:image\/[a-zA-Z0-9+.-]+;base64,/i.test(trimmed)) {
    return 'base64';
  }

  // Common web URLs and relative paths
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('blob:')
  ) {
    return 'url';
  }

  // Raw base64 string without data prefix (e.g., starts with /9j/ for JPEG, iVBOR for PNG, etc.)
  if (trimmed.length > 100 && /^[A-Za-z0-9+/=\r\n]+$/.test(trimmed.slice(0, 100))) {
    return 'base64';
  }

  // Default to URL if it contains typical URL characters
  return 'url';
}

export function isBase64Image(src?: string | null): boolean {
  return detectImageSource(src) === 'base64';
}

export function isUrlImage(src?: string | null): boolean {
  return detectImageSource(src) === 'url';
}

/**
 * Provides user-facing label and styling metadata for the detected source.
 */
export function getImageSourceInfo(src?: string | null): ImageSourceInfo {
  const type = detectImageSource(src);
  if (type === 'base64') {
    return {
      type: 'base64',
      label: 'Image Base64 (Locale)',
      badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: 'image',
    };
  }
  if (type === 'url') {
    return {
      type: 'url',
      label: 'Lien Web (URL)',
      badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      icon: 'link',
    };
  }
  return {
    type: 'empty',
    label: 'Aucune Image',
    badgeClass: 'bg-slate-800 text-slate-400 border-slate-700',
    icon: 'alert',
  };
}

/**
 * Ensures an image source is valid for <img src="..."> rendering.
 * Normalizes raw Base64 without data URI prefix.
 */
export function formatImageDisplay(src?: string | null, fallback = ''): string {
  if (!src || typeof src !== 'string') return fallback;
  const trimmed = src.trim();
  if (!trimmed) return fallback;

  // If it's a raw base64 string without data:image/...;base64,
  if (!trimmed.startsWith('data:') && !trimmed.startsWith('http') && !trimmed.startsWith('/') && !trimmed.startsWith('blob:')) {
    if (trimmed.startsWith('/9j/')) {
      return `data:image/jpeg;base64,${trimmed}`;
    }
    if (trimmed.startsWith('iVBORw0KGgo')) {
      return `data:image/png;base64,${trimmed}`;
    }
    if (trimmed.startsWith('R0lGOD')) {
      return `data:image/gif;base64,${trimmed}`;
    }
    if (trimmed.startsWith('UklGR')) {
      return `data:image/webp;base64,${trimmed}`;
    }
    return `data:image/jpeg;base64,${trimmed}`;
  }

  return trimmed;
}

/**
 * Converts a browser File to an optimized Base64 string.
 * Resizes large photos client-side to maintain sharp HD quality (max 1600px)
 * while keeping file sizes lightweight (~150-300KB) to prevent storage quota limits.
 */
export async function fileToBase64(
  file: File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<string> {
  const { maxWidth = 1600, maxHeight = 1200, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Erreur de lecture du fichier image'));

    reader.onload = () => {
      const result = reader.result as string;
      if (!result) return resolve('');

      // Keep SVGs untouched
      if (file.type === 'image/svg+xml') {
        return resolve(result);
      }

      // If in browser with window/Image available, perform intelligent HD canvas resizing
      if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
        const img = new Image();
        img.onerror = () => resolve(result);
        img.onload = () => {
          try {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
              if (width / height > maxWidth / maxHeight) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) return resolve(result);

            // High-quality image smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const dataUrl = canvas.toDataURL(mime, quality);
            resolve(dataUrl);
          } catch {
            // Fallback to raw base64 if canvas operations fail
            resolve(result);
          }
        };
        img.src = result;
      } else {
        resolve(result);
      }
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converts multiple files to Base64 in parallel.
 */
export async function filesToBase64(
  files: FileList | File[],
  options?: { maxWidth?: number; maxHeight?: number; quality?: number }
): Promise<string[]> {
  const fileArray = Array.from(files);
  return Promise.all(fileArray.map((f) => fileToBase64(f, options)));
}
