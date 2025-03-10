document.addEventListener('alpine:init', () => {
    Alpine.data('cardData', () => ({
        title: "Organic candies",
        description: "Candies with clean organic sweeteners, and flavors from actual fruit. Single ingredient gummies: ashwagandha, apple cider vinegar, elderberry, and turmeric.",
        updated_at: "2 hours ago",
        categories: ["Food", "Desserts", "Organic", "Bio", "Vegan", "Gluten free"],
        website: "#"
    }));
});