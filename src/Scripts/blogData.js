const recipeBlogPosts = [
  // steak
  {
    id: 7,
    title: "The Art of Perfectly Seared Steak with Peppercorn Sauce",
    author: "Chef Michael Wellington",
    date: "3 days ago",
    comments: 18,
    intro: "After working in steakhouses for 15 years, I've mastered the technique for restaurant-quality steak at home. This peppercorn sauce will change your steak game forever.",
    sections: {
      ingredients: {
        heading: "Premium Ingredients",
        text: "2-inch thick ribeye steak, coarse sea salt, cracked black peppercorns, heavy cream, brandy, beef stock, and seasonal vegetables (asparagus, baby carrots). Use unsalted butter for basting."
      },
      instructions: {
        heading: "Chef's Technique",
        steps: [
          "1. Prep: Pat steak dry and season generously 1 hour before cooking. Bring to room temperature.",
          "2. Sear: Cook in cast-iron skillet with oil (2 mins/side). Add butter, garlic, and thyme; baste for 1 minute.",
          "3. Sauce: Deglaze pan with brandy, add cream and crushed peppercorns. Simmer until thickened.",
          "4. Rest: Let steak rest 10 minutes before slicing against the grain."
        ],
        imageAlt: "Searing steak in cast iron"
      },
      quote: {
        text: "\"A perfect steak should have a crust like the bark of an oak tree and be as tender as butter inside.\"",
        author: "Chef Michael Wellington"
      },
      tips: {
        heading: "Pro Secrets",
        text: "Use an instant-read thermometer (130°F for medium-rare). For crisp-tender veggies, blanch then sauté in steak drippings. Always preheat your skillet until smoking hot.",
        imageAlt: "Sliced steak with sauce"
      },
      authorBio: {
        role: "Head Chef at The Chophouse",
        description: "I've cooked over 10,000 steaks in my career. This method combines French technique with American boldness."
      }
    }
  },

  //Classic Italian Pasta
  {
    id: 4,  
    title: "Authentic Homemade Italian Pasta from Scratch",
    author: "Chef Giovanni Rossi",
    date: "5 days ago",
    comments: 24,
    intro: "Growing up in my nonna's kitchen in Bologna, I learned the secrets to perfect pasta dough that's been passed down for generations. This is the real deal - just flour, eggs, and love.",
    sections: {
      ingredients: {
        heading: "Simple Ingredients",
        text: "00 flour (300g), fresh eggs (3 large), semolina flour (for dusting), sea salt, and extra virgin olive oil. For the sauce: San Marzano tomatoes, fresh basil, garlic, and Parmigiano-Reggiano."
      },
      instructions: {
        heading: "Traditional Pasta Making",
        steps: [
          "1. Dough: Create a flour well, add eggs in center. Gradually incorporate flour until a shaggy dough forms.",
          "2. Knead: Work the dough for 10 minutes until smooth and elastic. Wrap in plastic, rest for 30 minutes.",
          "3. Roll: Divide dough, roll through pasta machine from thickest to thinnest setting (about 6 passes).",
          "4. Cut: Dust with semolina, fold gently, and cut into tagliatelle ribbons (about 8mm wide)."
        ],
        imageAlt: "Handmaking pasta dough"
      },
      quote: {
        text: "\"Perfect pasta should have just enough bite to resist your teeth, then yield like a tender embrace.\"",
        author: "Chef Giovanni Rossi"
      },
      tips: {
        heading: "Nonna's Wisdom",
        text: "Use room temperature eggs for better absorption. The dough should feel like your earlobe when pinched. Let rolled sheets dry slightly before cutting to prevent sticking. Cook in generously salted boiling water for just 90 seconds.",
        imageAlt: "Fresh cut pasta drying"
      },
      authorBio: {
        role: "Third-Generation Pastaio",
        description: "I run a small trattoria in Florence where we make all pasta by hand daily. My nonna still tastes every batch and isn't afraid to tell me when it's not perfect."
      }
    }
  },

  // Delicious Pancake with Strawberries
  {
    id: 2,
    title: "Fluffy Buttermilk Pancakes with Fresh Strawberry Compote",
    author: "Sophie Baker",
    date: "1 week ago",
    comments: 22,
    intro: "My grandmother's pancake recipe, perfected over 40 years of Sunday breakfasts. The strawberry compote makes these unforgettable.",
    sections: {
      ingredients: {
        heading: "Farmhouse Ingredients",
        text: "Buttermilk, fresh strawberries, all-purpose flour, baking powder, eggs, vanilla bean, and maple syrup. For extra fluffiness, whip the egg whites separately."
      },
      instructions: {
        heading: "Homemade Method",
        steps: [
          "1. Batter: Whisk dry ingredients, then fold in buttermilk and egg yolks. Gently mix in stiff egg whites.",
          "2. Cook: Ladle onto buttered griddle (375°F). Flip when bubbles form (about 90 seconds).",
          "3. Compote: Simmer strawberries with sugar and lemon juice until jammy (10 minutes).",
          "4. Serve: Stack pancakes warm with compote and whipped cream."
        ],
        imageAlt: "Pancake stack with strawberries"
      },
      quote: {
        text: "\"Good pancakes should be light as clouds and sweet as summer berries.\"",
        author: "Sophie Baker"
      },
      tips: {
        heading: "Breakfast Wisdom",
        text: "Let batter rest 15 minutes for taller pancakes. For perfect compote, use slightly underripe berries—they hold shape better. Freeze extras between parchment paper.",
        imageAlt: "Drizzling compote on pancakes"
      },
      authorBio: {
        role: "Baker & Breakfast Specialist",
        description: "I run a farm-to-table bed & breakfast where these pancakes are our most requested recipe."
      }
    }
  },

  // Tasty Burger and Fries
  {
    id: 3,
    title: "The Ultimate Smash Burger & Crispy Shoestring Fries",
    author: "Danny Grease",
    date: "2 days ago",
    comments: 35,
    intro: "This is how burger joints make those impossibly juicy, crispy-edged patties. My secret? Smashing, double-stacking, and a special fry technique.",
    sections: {
      ingredients: {
        heading: "Diner-Style Essentials",
        text: "80/20 ground chuck, potato buns, American cheese, russet potatoes, peanut oil, and special sauce (mayo, ketchup, pickle juice). Iceberg lettuce and pickles for crunch."
      },
      instructions: {
        heading: "Diner Technique",
        steps: [
          "1. Patties: Form 2oz beef balls. Smash flat on screaming-hot griddle with spatula. Salt immediately.",
          "2. Cook: 90 seconds per side. Add cheese during last 30 seconds. Stack two patties per bun.",
          "3. Fries: Soak matchstick potatoes in vinegar water, double-fry at 300°F then 375°F for extra crispness.",
          "4. Build: Toast buns in beef fat. Sauce both sides, add patties with classic toppings."
        ],
        imageAlt: "Smashing burger patties"
      },
      quote: {
        text: "\"The perfect burger should require two hands and at least three napkins.\"",
        author: "Danny Grease"
      },
      tips: {
        heading: "Griddle Secrets",
        text: "Don't overcrowd the griddle—steam is the enemy of crust. For cheese pull, cover patties with a metal bowl. Keep fries warm in a 200°F oven with the door cracked.",
        imageAlt: "Burger cross-section"
      },
      authorBio: {
        role: "Owner of Danny's Burger Joint",
        description: "I've served over 50,000 of these burgers. The secret? Never skimp on fat or heat."
      }
    }
  },

  // Delicious North Indian Thali with Butter Chicken, Naan, and Lentil Curry
  {
    id: 5,
    title: "Authentic North Indian Thali: Butter Chicken, Garlic Naan & Dal Tadka",
    author: "Priya Sharma",
    date: "5 days ago",
    comments: 28,
    intro: "My family's Punjabi thali recipe passed down through generations. Every component balances spice, texture, and comfort—just like in Delhi's best dhabas.",
    sections: {
      ingredients: {
        heading: "Traditional Ingredients",
        text: "Chicken thighs, yogurt, kasoori methi, cream, basmati rice, urad dal, garlic, cumin, ghee. For naan: atta flour, yogurt, and nigella seeds."
      },
      instructions: {
        heading: "Grandmother's Method",
        steps: [
          "1. Marinade: Soak chicken in spiced yogurt overnight. Grill over charcoal for smokiness.",
          "2. Curry: Simmer grilled chicken in tomato-cream sauce with butter and fenugreek.",
          "3. Dal: Pressure cook lentils, temper with ghee, cumin, and garlic.",
          "4. Naan: Hand-stretch dough, cook in tandoor or screaming-hot cast iron."
        ],
        imageAlt: "Indian thali components"
      },
      quote: {
        text: "\"A great thali should dance between spicy, sweet, and tangy—each bite telling a story.\"",
        author: "Priya Sharma"
      },
      tips: {
        heading: "Spice Wisdom",
        text: "For authentic butter chicken color, add Kashmiri red chili powder. Toast whole spices before grinding. Rest naan dough 4 hours for perfect bubbles. Serve with pickled onions.",
        imageAlt: "Serving thali"
      },
      authorBio: {
        role: "Home Chef & Spice Educator",
        description: "I teach Indian cooking classes where this thali is our signature lesson. My grandmother still critiques my dal!"
      }
    }
  },

  // Fruit Salad
  {
    id: 6,
    title: "The Perfect Summer Fruit Salad with Honey-Lime Dressing",
    author: "Olivia Green",
    date: "1 week ago",
    comments: 14,
    intro: "After testing 63 combinations, I cracked the code for a fruit salad that stays fresh for days. The secret? Citrus dressing and strategic layering.",
    sections: {
      ingredients: {
        heading: "Seasonal Selection",
        text: "Pineapple, kiwi, strawberries, blueberries, mint, local honey, lime zest/juice. Add pomegranate seeds for crunch and dragon fruit for color."
      },
      instructions: {
        heading: "Chef's Assembly",
        steps: [
          "1. Prep: Cut fruits into uniform bites (except berries). Keep citrus-dressed fruits separate.",
          "2. Dressing: Whisk honey with lime zest/juice and minced mint. Toss with heartier fruits first.",
          "3. Layer: Add delicate berries last. Chill 1 hour before serving for flavors to marry."
        ],
        imageAlt: "Colorful fruit mix"
      },
      quote: {
        text: "\"A fruit salad should burst with color and texture—like edible confetti.\"",
        author: "Olivia Green"
      },
      tips: {
        heading: "Freshness Tricks",
        text: "Avoid bananas (they brown) and watermelon (it waters down dressing). For parties, serve in hollowed pineapple halves. Add tajín for a spicy kick.",
        imageAlt: "Fruit salad bowl"
      },
      authorBio: {
        role: "Farmer's Market Vendor",
        description: "I curate fruit baskets for gourmet stores. This recipe changes weekly based on what's ripest."
      }
    }
  },

  // Healthy meal: rice with vegetables
  {
    id: 1,
    title: "Garlic Butter Vegetable Rice Pilaf: One-Pot Healthy Comfort",
    author: "Dr. Ethan Lee",
    date: "3 days ago",
    comments: 19,
    intro: "This isn't sad diet food—it's a vibrant, satisfying rice dish packed with 7 vegetables. My patients love it, and you will too.",
    sections: {
      ingredients: {
        heading: "Nutrient-Dense Ingredients",
        text: "Brown basmati rice, rainbow carrots, broccoli, red bell pepper, peas, garlic, vegetable broth, and toasted almonds. Turmeric for color and anti-inflammatory benefits."
      },
      instructions: {
        heading: "Doctor-Approved Method",
        steps: [
          "1. Sauté: Cook garlic in olive oil until fragrant. Add diced veggies (start with hardest first).",
          "2. Rice: Toast grains in the mix, then add broth (1:2 ratio). Cover and simmer 20 minutes.",
          "3. Finish: Fluff with fork, stir in fresh herbs and lemon juice. Top with crunchy almonds."
        ],
        imageAlt: "Rice and veggies cooking"
      },
      quote: {
        text: "\"Healthy eating should nourish both body and soul—this dish proves they're not mutually exclusive.\"",
        author: "Dr. Ethan Lee"
      },
      tips: {
        heading: "Nutrition Hacks",
        text: "Use frozen veggies for convenience. For protein, add chickpeas or tofu. Leftovers make perfect grain bowls. Kids love it with a sprinkle of Parmesan.",
        imageAlt: "Served rice pilaf"
      },
      authorBio: {
        role: "Nutritionist & Family Doctor",
        description: "I prescribe this recipe to patients wanting to eat healthier without sacrificing flavor. It's been clinic-tested!"
      }
    }
  }
];

