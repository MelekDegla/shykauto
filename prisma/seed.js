import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    {
        name: 'Frigo Soft 2000',
        slug: 'frigo-soft-2000',
        description: "Unité de réfrigération de transport compacte. Offre une puissance frigorifique allant jusqu'à 1565W (R404A) / 1206W (R134a), un débit d'air de 670 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 575 x 480 x 180 mm (8 kg) ; Dimensions de l'évaporateur interne : 660 x 500 x 157 mm (7,5 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: true,
        images: [
            'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Puissance frigorifique': "Jusqu'à 1565W (R404A) / 1206W (R134a)",
            "Débit d'air": '670 m³/h',
            'Volume de caisse': '5 à 8 m³',
            'Absorption': '14 Amp',
            'Dimensions externes': '575 x 480 x 180 mm (8 kg)',
            "Évaporateur interne": '660 x 500 x 157 mm (7,5 kg)'
        }
    },
    {
        name: 'Frigo Soft 3000',
        slug: 'frigo-soft-3000',
        description: "Unité de réfrigération de transport certifiée ATP. Offre une puissance frigorifique allant jusqu'à 2799W (R404A) / 1550W (R404A), un débit d'air de 1040 m³/h, adaptée pour des volumes de caisse jusqu'à 12 m³, avec une absorption de 16 Amp. Dimensions externes : 900 x 500 x 157 mm (10,5 kg) ; Dimensions de l'évaporateur interne : 815 x 600 x 150 mm (12 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Certification': 'Certifiée ATP',
            'Puissance frigorifique': "Jusqu'à 2799W (R404A) / 1550W (R404A)",
            "Débit d'air": '1040 m³/h',
            'Volume de caisse': "Jusqu'à 12 m³",
            'Absorption': '16 Amp',
            'Dimensions externes': '900 x 500 x 157 mm (10,5 kg)',
            "Évaporateur interne": '815 x 600 x 150 mm (12 kg)'
        }
    },
    {
        name: 'Frigo Soft 4000',
        slug: 'frigo-soft-4000',
        description: "Unité de réfrigération de transport haute capacité certifiée ATP. Offre une puissance frigorifique allant jusqu'à 3660W (R404A) / 2040W (R134a), un débit d'air de 1534 m³/h, adaptée pour des volumes de caisse de 14 à 18 m³, avec une absorption de 16 Amp. Dimensions externes : 1000 x 500 x 157 mm (12,5 kg) ; Dimensions de l'évaporateur interne : 955 x 600 x 150 mm (14 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png'
        ],
        specs: {
            'Certification': 'Haute capacité certifiée ATP',
            'Puissance frigorifique': "Jusqu'à 3660W (R404A) / 2040W (R134a)",
            "Débit d'air": '1534 m³/h',
            'Volume de caisse': '14 à 18 m³',
            'Absorption': '16 Amp',
            'Dimensions externes': '1000 x 500 x 157 mm (12,5 kg)',
            "Évaporateur interne": '955 x 600 x 150 mm (14 kg)'
        }
    },
    {
        name: 'Frigo Top FT 20',
        slug: 'frigo-top-ft-20',
        description: "Unité de réfrigération de transport compacte montée sur le toit. Offre une puissance frigorifique allant jusqu'à 1650W (R404A) / 1350W (R134a), un débit d'air de 1430 m³/h, adaptée pour des volumes de caisse de 5 à 8 m³, avec une absorption de 14 Amp. Dimensions externes : 800 x 510 x 230 mm (19 kg) ; Dimensions de l'évaporateur interne : 660 x 498 x 149 mm (10,5 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: true,
        images: [
            'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
            'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Montage': 'Montée sur le toit',
            'Puissance frigorifique': "Jusqu'à 1650W (R404A) / 1350W (R134a)",
            "Débit d'air": '1430 m³/h',
            'Volume de caisse': '5 à 8 m³',
            'Absorption': '14 Amp',
            'Dimensions externes': '800 x 510 x 230 mm (19 kg)',
            "Évaporateur interne": '660 x 498 x 149 mm (10,5 kg)'
        }
    },
    {
        name: 'Frigo Top FT 40D',
        slug: 'frigo-top-ft-40d',
        description: "Unité de réfrigération de transport intensive montée sur le toit. Offre une puissance frigorifique allant jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse de 13 à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1035 x 551 x 230 mm (27 kg) ; Dimensions de l'évaporateur interne : 1000 x 630 x 152 mm (17 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: false,
        images: [
            'https://d2rqvrnppmk7he.cloudfront.net/article-imagepool/w500/55/6a/71018_1.jpg?20230525101436',
            'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Montage': 'Montée sur le toit (Route & Secteur)',
            'Puissance frigorifique': "Jusqu'à 4044W (Route / R404A) / 2156W (Secteur / R404A)",
            "Débit d'air": '2800 à 2860 m³/h',
            'Volume de caisse': '13 à 24,6 m³',
            'Absorption': '21 à 42 Amp',
            'Dimensions externes': '1035 x 551 x 230 mm (27 kg)',
            "Évaporateur interne": '1000 x 630 x 152 mm (17 kg)'
        }
    },
    {
        name: 'Frigo Top FT 45RT-D',
        slug: 'frigo-top-ft-45rt-d',
        description: "Unité de réfrigération de transport haut de gamme pour toit. Offre une puissance frigorifique allant jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A), un débit d'air de 2800 à 2860 m³/h, adaptée pour des volumes de caisse jusqu'à 24,6 m³, avec une absorption de 21 à 42 Amp. Dimensions externes : 1115 x 665 x 180 mm (34 kg) ; Dimensions de l'évaporateur interne : 1135 x 530 x 150 mm (22 kg).",
        category: 'Groupes frigorifiques',
        availability: 'IN_STOCK',
        featured: false,
        images: [
            'https://cdn.h2r-equipements.com/8852-medium_default/off-top-loaded-tl41.jpg',
            'https://www.hellopro.fr/images/produit-2/4/3/8/groupe-frigorifique-electrique-tonga-route-et-secteur-8052834.png',
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Montage': 'Haut de gamme pour toit (Route & Secteur)',
            'Puissance frigorifique': "Jusqu'à 4910W (Route / R404A) / 2520W (Secteur / R404A)",
            "Débit d'air": '2800 à 2860 m³/h',
            'Volume de caisse': "Jusqu'à 24,6 m³",
            'Absorption': '21 à 42 Amp',
            'Dimensions externes': '1115 x 665 x 180 mm (34 kg)',
            "Évaporateur interne": '1135 x 530 x 150 mm (22 kg)'
        }
    }
];

async function main() {
    console.log('🌱 Starting product database seeding...');

    // Delete obsolete products not in new table
    const targetSlugs = products.map(p => p.slug);
    await prisma.product.deleteMany({
        where: {
            slug: { notIn: targetSlugs }
        }
    });

    for (const item of products) {
        const result = await prisma.product.upsert({
            where: { slug: item.slug },
            update: item,
            create: item,
        });
        console.log(`✅ Seeded: ${result.name} (${result.slug})`);
    }

    console.log(`🎉 Successfully seeded ${products.length} products!`);
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });