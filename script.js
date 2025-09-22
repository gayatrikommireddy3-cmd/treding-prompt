// Sample trending prompts data
const trendingPrompts = [
    {
        id: 1,
        title: "Create a sci-fi story about AI",
        content: "Write a short science fiction story set in the year 2045 where artificial intelligence has become indistinguishable from human consciousness. Focus on the emotional journey of an AI discovering what it means to be alive.",
        category: "ai",
        createdAt: "2023-10-15",
        popularity: 98,
        views: 12500
    },
    {
        id: 2,
        title: "Design a sustainable city",
        content: "Imagine and describe a completely sustainable city of the future. Include details about energy sources, transportation systems, architecture, waste management, and how residents interact with their environment.",
        category: "creative",
        createdAt: "2023-10-14",
        popularity: 87,
        views: 8900
    },
    {
        id: 3,
        title: "Marketing strategy for startups",
        content: "Develop a comprehensive marketing strategy for a tech startup with limited budget. Include social media tactics, content marketing, influencer partnerships, and metrics to track success.",
        category: "business",
        createdAt: "2023-10-13",
        popularity: 92,
        views: 10300
    },
    {
        id: 4,
        title: "Explain quantum computing",
        content: "Explain quantum computing in simple terms that a non-technical person could understand. Use analogies and real-world examples to illustrate key concepts like superposition and entanglement.",
        category: "tech",
        createdAt: "2023-10-12",
        popularity: 89,
        views: 9700
    },
    {
        id: 5,
        title: "Create a mindfulness exercise",
        content: "Design a 5-minute mindfulness exercise that can be done anywhere, even in a busy office environment. Focus on breathing techniques and mental visualization to reduce stress and increase focus.",
        category: "creative",
        createdAt: "2023-10-11",
        popularity: 95,
        views: 11200
    },
    {
        id: 6,
        title: "Predict future social media trends",
        content: "Analyze current social media patterns and predict the top 3 trends that will dominate platforms in the next 2-3 years. Consider technology advancements, user behavior shifts, and cultural changes.",
        category: "tech",
        createdAt: "2023-10-10",
        popularity: 85,
        views: 8200
    },
    {
        id: 7,
        title: "Write a poem about technology",
        content: "Compose a poem that explores the relationship between humans and technology. Consider both the benefits and challenges, and use vivid imagery to convey emotion and meaning.",
        category: "creative",
        createdAt: "2023-10-09",
        popularity: 88,
        views: 7800
    },
    {
        id: 8,
        title: "Business plan for AI consultancy",
        content: "Create a detailed business plan for an AI consultancy firm targeting small to medium businesses. Include services offered, pricing strategy, target market analysis, and projected growth over 3 years.",
        category: "business",
        createdAt: "2023-10-08",
        popularity: 91,
        views: 9400
    },
    {
        id: 9,
        title: "Generate Python code for data analysis",
        content: "Write a Python script that reads a CSV file, performs basic data cleaning, creates visualizations of key metrics, and exports a summary report. Include error handling and documentation.",
        category: "tech",
        createdAt: "2023-10-07",
        popularity: 93,
        views: 10800
    },
    {
        id: 10,
        title: "Create a character for a novel",
        content: "Develop a detailed character profile for a protagonist in a mystery novel. Include physical description, personality traits, backstory, motivations, flaws, and character arc throughout the story.",
        category: "creative",
        createdAt: "2023-10-06",
        popularity: 86,
        views: 7500
    },
    {
        id: 11,
        title: "Ethical implications of AI art",
        content: "Discuss the ethical implications of AI-generated art. Consider copyright issues, the definition of creativity, economic impact on artists, and potential solutions for a balanced ecosystem.",
        category: "ai",
        createdAt: "2023-10-05",
        popularity: 94,
        views: 11700
    },
    {
        id: 12,
        title: "Plan a viral marketing campaign",
        content: "Design a viral marketing campaign for a new eco-friendly product. Include the core message, target platforms, content formats, influencer strategy, and metrics to measure virality and conversion.",
        category: "business",
        createdAt: "2023-10-04",
        popularity: 83,
        views: 6900
    }
];

// DOM Elements
const promptsContainer = document.getElementById('prompts-container');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// State variables
let currentFilter = 'all';
let currentSort = 'trending';
let displayedPrompts = 10; // Number of prompts to display initially
let allPrompts = [...trendingPrompts];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderPrompts();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            displayedPrompts = 10; // Reset when changing filter
            renderPrompts();
        });
    });
    
    // Sort functionality
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderPrompts();
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        displayedPrompts += 5;
        renderPrompts();
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        allPrompts = trendingPrompts.filter(prompt => 
            prompt.title.toLowerCase().includes(searchTerm) || 
            prompt.content.toLowerCase().includes(searchTerm)
        );
    } else {
        allPrompts = [...trendingPrompts];
    }
    displayedPrompts = 10; // Reset displayed count on new search
    renderPrompts();
}

// Apply filters
function applyFilters() {
    if (currentFilter === 'all') {
        return allPrompts;
    }
    return allPrompts.filter(prompt => prompt.category === currentFilter);
}

// Apply sorting
function applySorting(prompts) {
    const sortedPrompts = [...prompts];
    
    switch (currentSort) {
        case 'trending':
            return sortedPrompts.sort((a, b) => b.popularity - a.popularity);
        case 'newest':
            return sortedPrompts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'popular':
            return sortedPrompts.sort((a, b) => b.views - a.views);
        case 'alphabetical':
            return sortedPrompts.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sortedPrompts;
    }
}

// Render prompts to the DOM
function renderPrompts() {
    const filteredPrompts = applyFilters();
    const sortedPrompts = applySorting(filteredPrompts);
    const promptsToDisplay = sortedPrompts.slice(0, displayedPrompts);
    
    // Clear container
    promptsContainer.innerHTML = '';
    
    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading prompts...';
    promptsContainer.appendChild(loadingDiv);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        promptsContainer.innerHTML = '';
        
        if (promptsToDisplay.length === 0) {
            showEmptyState();
            return;
        }
        
        // Render each prompt
        promptsToDisplay.forEach((prompt, index) => {
            const promptCard = createPromptCard(prompt);
            promptCard.style.animationDelay = `${index * 0.1}s`;
            promptsContainer.appendChild(promptCard);
        });
        
        // Show or hide load more button
        if (displayedPrompts >= sortedPrompts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }, 300);
}

// Create a prompt card element
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card fade-in';
    
    // Format date
    const formattedDate = new Date(prompt.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="prompt-tag">${prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)}</div>
        <h3 class="prompt-title">${prompt.title}</h3>
        <p class="prompt-content">${prompt.content}</p>
        <div class="prompt-meta">
            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
            <div class="prompt-actions">
                <button><i class="far fa-eye"></i> ${prompt.views.toLocaleString()}</button>
                <button><i class="far fa-heart"></i> ${prompt.popularity}</button>
            </div>
        </div>
        <button class="copy-btn" data-prompt-id="${prompt.id}">
            <i class="far fa-copy"></i> Copy Prompt
        </button>
    `;
    
    // Add copy functionality
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(prompt.content)
            .then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy Prompt';
                    copyBtn.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                copyBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy Prompt';
                }, 2000);
            });
    });
    
    return card;
}

// Show empty state when no prompts match
function showEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>No prompts found</h3>
        <p>Try adjusting your search or filter criteria</p>
    `;
    promptsContainer.appendChild(emptyState);
}

// Add more sample prompts for demonstration
function generateMorePrompts() {
    const categories = ['ai', 'creative', 'business', 'tech'];
    const titles = [
        "Create a dialogue between two historical figures",
        "Design an app that solves a common daily problem",
        "Write a persuasive speech about climate change",
        "Develop a workout plan for busy professionals",
        "Create a recipe using unusual ingredient combinations",
        "Design a board game for family game night",
        "Write a guide for overcoming procrastination",
        "Create a plan for a sustainable fashion brand",
        "Develop a concept for a virtual reality experience",
        "Write a letter to your future self"
    ];
    
    const contents = [
        "Write a conversation between Leonardo da Vinci and Steve Jobs discussing innovation across centuries.",
        "Design a mobile application that helps people reduce food waste in their homes with features like inventory tracking and recipe suggestions.",
        "Craft a compelling speech about the urgency of addressing climate change, targeted at skeptical business leaders.",
        "Create a 20-minute daily workout routine that requires no equipment and can be done in a small apartment.",
        "Develop a recipe that combines unexpected ingredients like chocolate and chili or watermelon and feta cheese.",
        "Design a board game for 4-6 players that encourages cooperation rather than competition, with a theme of space exploration.",
        "Write a practical guide with actionable steps for overcoming procrastination, including psychological insights and productivity techniques.",
        "Develop a business plan for a sustainable fashion brand that uses recycled materials and ethical manufacturing processes.",
        "Create a concept for an immersive virtual reality experience that allows users to explore ancient civilizations.",
        "Write a heartfelt letter to yourself 10 years from now, reflecting on your current hopes, fears, and aspirations."
    ];
    
    let newId = trendingPrompts.length + 1;
    
    for (let i = 0; i < 20; i++) {
        trendingPrompts.push({
            id: newId++,
            title: titles[i % titles.length],
            content: contents[i % contents.length],
            category: categories[Math.floor(Math.random() * categories.length)],
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            popularity: Math.floor(Math.random() * 30) + 70,
            views: Math.floor(Math.random() * 5000) + 3000
        });
    }
}

// Generate more prompts for demonstration purposes
generateMorePrompts();