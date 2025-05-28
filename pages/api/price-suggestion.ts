
export default function handler(req, res) {
  const { brand, condition, category, originalPrice, rarity, material } = req.body;

  const brandScoreMap = {
    'Zara': 1,
    'H&M': 2,
    'Coach': 3,
    'Gucci': 4,
    'Louis Vuitton': 5
  };

  const conditionMultiplier = {
    'new': 1.0,
    'like new': 0.9,
    'used': 0.7,
    'heavily used': 0.5
  };

  const categoryMultiplier = {
    'bag': 1.2,
    'shoes': 1.0,
    'watch': 1.5,
    'clothing': 0.8
  };

  const rarityBoost = rarity === 'limited' ? 1.2 : rarity === 'rare' ? 1.1 : 1.0;
  const materialBoost = material === 'leather' ? 1.1 : material === 'synthetic' ? 0.9 : 1.0;

  const brandScore = brandScoreMap[brand] || 2;
  const base = Number(originalPrice);

  const rawPrice = base * (
    0.3 + brandScore * 0.05
  ) * conditionMultiplier[condition] *
    categoryMultiplier[category] * rarityBoost * materialBoost;

  const minPrice = Math.round(rawPrice * 0.95);
  const maxPrice = Math.round(rawPrice * 1.15);
  const confidence = Math.min(100, Math.round((brandScore + 2) * 10));

  res.status(200).json({
    priceRange: { min: minPrice, max: maxPrice },
    confidence,
    reason: `Adjusted for brand prestige, rarity, and condition`
  });
}
