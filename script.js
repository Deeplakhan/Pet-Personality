// Pet Personality Finder - Quiz Logic

// Quiz State
let currentQuestion = 0;
let answers = [];
let isAnimating = false;

// Personality Types
const personalities = {
    golden_retriever: {
        emoji: '🐕',
        name: 'Golden Retriever Energy',
        tagline: 'The Sunshine Friend Everyone Needs',
        description: "You're the embodiment of pure joy and unconditional love. Like a golden retriever, you bring warmth and positivity everywhere you go. You're loyal to your friends, always ready for an adventure, and your enthusiasm is absolutely contagious. People are drawn to your genuine, approachable nature, and you're probably the friend who checks in on everyone.",
        traits: ['Loyal', 'Enthusiastic', 'Friendly', 'Optimistic', 'Adventurous'],
        compatibility: ['🐈 Cat', '🦊 Fox', '🐰 Rabbit'],
        scores: { social: 3, energy: 3, loyalty: 3, independence: 1, playfulness: 3 }
    },
    cat: {
        emoji: '🐈',
        name: 'Cat Energy',
        tagline: 'Independent, Mysterious & Selectively Affectionate',
        description: "You're a master of boundaries and self-care. Like a cat, you value your independence and personal space, but when you choose to give affection, it's genuine and meaningful. You're observant, intelligent, and have a certain mysterious charm. You don't need constant attention, but you appreciate quality time with those who truly understand you.",
        traits: ['Independent', 'Observant', 'Self-sufficient', 'Mysterious', 'Selective'],
        compatibility: ['🐕 Golden Retriever', '🦉 Owl', '🦌 Deer'],
        scores: { social: 1, energy: 1, loyalty: 2, independence: 3, playfulness: 2 }
    },
    fox: {
        emoji: '🦊',
        name: 'Fox Energy',
        tagline: 'Clever, Adaptable & Full of Surprises',
        description: "You're quick-witted and resourceful, always finding creative solutions to problems. Like a fox, you're adaptable and can thrive in any environment. You have a playful mischievous side and love keeping people on their toes. You're strategic but not manipulative—you just know how to navigate social situations with grace and charm.",
        traits: ['Clever', 'Adaptable', 'Playful', 'Strategic', 'Charming'],
        compatibility: ['🐕 Golden Retriever', '🐺 Wolf', '🦝 Raccoon'],
        scores: { social: 2, energy: 2, loyalty: 2, independence: 2, playfulness: 3 }
    },
    owl: {
        emoji: '🦉',
        name: 'Owl Energy',
        tagline: 'Wise, Thoughtful & Deeply Perceptive',
        description: "You're the philosopher of your friend group, always offering thoughtful insights and wisdom. Like an owl, you prefer meaningful conversations over small talk and have a natural ability to see what others miss. You're a night owl who does your best thinking when the world is quiet. Your calm presence makes others feel safe and understood.",
        traits: ['Wise', 'Thoughtful', 'Observant', 'Patient', 'Introspective'],
        compatibility: ['🐈 Cat', '🐢 Tortoise', '🦌 Deer'],
        scores: { social: 1, energy: 1, loyalty: 3, independence: 3, playfulness: 1 }
    },
    rabbit: {
        emoji: '🐰',
        name: 'Rabbit Energy',
        tagline: 'Gentle, Caring & Comfortingly Consistent',
        description: "You bring a sense of calm and comfort to everyone around you. Like a rabbit, you're gentle, nurturing, and create cozy spaces wherever you go. You value security and routine, and your friends know they can always count on you for emotional support. You might be quiet, but your kindness speaks volumes.",
        traits: ['Gentle', 'Nurturing', 'Reliable', 'Calm', 'Supportive'],
        compatibility: ['🐕 Golden Retriever', '🦌 Deer', '🐼 Panda'],
        scores: { social: 2, energy: 1, loyalty: 3, independence: 1, playfulness: 2 }
    },
    wolf: {
        emoji: '🐺',
        name: 'Wolf Energy',
        tagline: 'Fiercely Loyal with a Wild Heart',
        description: "You value deep connections and would do anything for your pack. Like a wolf, you're protective, loyal, and have a strong sense of family—whether that's blood relatives or chosen family. You have a wild, untamed spirit but also understand the importance of teamwork. Your intensity can be intimidating, but those who know you see your tender side.",
        traits: ['Loyal', 'Protective', 'Intense', 'Pack-oriented', 'Passionate'],
        compatibility: ['🦊 Fox', '🦅 Eagle', '🐻 Bear'],
        scores: { social: 2, energy: 3, loyalty: 3, independence: 2, playfulness: 2 }
    },
    panda: {
        emoji: '🐼',
        name: 'Panda Energy',
        tagline: 'Easygoing, Lovable & Unapologetically Chill',
        description: "You're the definition of 'go with the flow.' Like a panda, you're easygoing, lovable, and find joy in life's simple pleasures—good food, good company, and plenty of rest. You don't stress about the small stuff and have a knack for making others feel relaxed. Your laid-back attitude is a breath of fresh air in a hectic world.",
        traits: ['Easygoing', 'Lovable', 'Relaxed', 'Content', 'Genuine'],
        compatibility: ['🐰 Rabbit', '🐨 Koala', '🦥 Sloth'],
        scores: { social: 2, energy: 1, loyalty: 2, independence: 2, playfulness: 2 }
    },
    eagle: {
        emoji: '🦅',
        name: 'Eagle Energy',
        tagline: 'Ambitious, Visionary & Soaring Above',
        description: "You have big dreams and the determination to achieve them. Like an eagle, you have a clear vision of what you want and aren't afraid to soar above the crowd to get it. You're ambitious, focused, and inspire others with your drive. While you might seem distant at times, it's just because you're focused on your goals.",
        traits: ['Ambitious', 'Visionary', 'Focused', 'Independent', 'Inspiring'],
        compatibility: ['🐺 Wolf', '🦁 Lion', '🦈 Shark'],
        scores: { social: 1, energy: 3, loyalty: 2, independence: 3, playfulness: 1 }
    },
    dolphin: {
        emoji: '🐬',
        name: 'Dolphin Energy',
        tagline: 'Playful, Social & Joyfully Intelligent',
        description: "You're the life of the party and the heart of your friend group. Like a dolphin, you're playful, social, and incredibly intelligent. You love making others laugh and have a gift for bringing people together. Your curiosity leads you to new experiences, and your optimism keeps you riding the waves of life with a smile.",
        traits: ['Playful', 'Social', 'Intelligent', 'Curious', 'Joyful'],
        compatibility: ['🐕 Golden Retriever', '🦜 Parrot', '🐶 Dog'],
        scores: { social: 3, energy: 3, loyalty: 2, independence: 1, playfulness: 3 }
    },
    bear: {
        emoji: '🐻',
        name: 'Bear Energy',
        tagline: 'Strong, Grounded & Comfortingly Protective',
        description: "You're a pillar of strength that others lean on. Like a bear, you're powerful yet gentle, protective but not overbearing. You value your downtime and need periods of rest to recharge your considerable energy. When you commit to something, you give it your all. Your presence alone makes others feel safe.",
        traits: ['Strong', 'Protective', 'Grounded', 'Nurturing', 'Determined'],
        compatibility: ['🐺 Wolf', '🦉 Owl', '🐰 Rabbit'],
        scores: { social: 2, energy: 2, loyalty: 3, independence: 2, playfulness: 2 }
    },
    hummingbird: {
        emoji: '🐦',
        name: 'Hummingbird Energy',
        tagline: 'Energetic, Curious & Always in Motion',
        description: "You're a burst of energy and creativity that never seems to stop. Like a hummingbird, you're always flitting from one interesting thing to the next, bringing joy and color wherever you go. You have a short attention span but make up for it with enthusiasm. Your zest for life is absolutely infectious.",
        traits: ['Energetic', 'Curious', 'Creative', 'Optimistic', 'Spontaneous'],
        compatibility: ['🐬 Dolphin', '🦊 Fox', '🦜 Parrot'],
        scores: { social: 3, energy: 3, loyalty: 1, independence: 2, playfulness: 3 }
    },
    tortoise: {
        emoji: '🐢',
        name: 'Tortoise Energy',
        tagline: 'Patient, Steady & Wisely Persistent',
        description: "You understand that slow and steady wins the race. Like a tortoise, you're patient, methodical, and incredibly persistent. You don't rush into things, preferring to think carefully before acting. Your calm, steady presence provides stability for those around you, and when you set your mind to something, you always see it through.",
        traits: ['Patient', 'Steady', 'Wise', 'Persistent', 'Reliable'],
        compatibility: ['🦉 Owl', '🐨 Koala', '🐼 Panda'],
        scores: { social: 1, energy: 1, loyalty: 3, independence: 3, playfulness: 1 }
    }
};

// Questions
const questions = [
    {
        text: "It's Friday night. What's your ideal plan?",
        answers: [
            { text: "Big group hangout with friends", emoji: "🎉", scores: { social: 3, energy: 2 } },
            { text: "Cozy night in with a book or movie", emoji: "📚", scores: { social: 1, energy: 1 } },
            { text: "Spontaneous adventure somewhere new", emoji: "🗺️", scores: { social: 2, energy: 3 } },
            { text: "One-on-one time with my bestie", emoji: "💕", scores: { social: 2, energy: 1 } }
        ]
    },
    {
        text: "How do your friends describe you?",
        answers: [
            { text: "The life of the party", emoji: "🎭", scores: { social: 3, playfulness: 3 } },
            { text: "The wise advisor", emoji: "🦉", scores: { social: 1, loyalty: 2 } },
            { text: "The loyal protector", emoji: "🛡️", scores: { loyalty: 3, social: 2 } },
            { text: "The chill, easygoing one", emoji: "😌", scores: { social: 2, energy: 1 } }
        ]
    },
    {
        text: "What's your approach to problems?",
        answers: [
            { text: "Think carefully before acting", emoji: "🤔", scores: { independence: 3, energy: 1 } },
            { text: "Jump in and figure it out", emoji: "⚡", scores: { energy: 3, playfulness: 2 } },
            { text: "Ask friends for advice", emoji: "👥", scores: { social: 3, loyalty: 2 } },
            { text: "Find a creative solution", emoji: "💡", scores: { independence: 2, playfulness: 3 } }
        ]
    },
    {
        text: "How do you recharge your energy?",
        answers: [
            { text: "Being around people I love", emoji: "❤️", scores: { social: 3, energy: 2 } },
            { text: "Alone time in my own space", emoji: "🏠", scores: { independence: 3, social: 1 } },
            { text: "Doing something active/fun", emoji: "🏃", scores: { energy: 3, playfulness: 2 } },
            { text: "Quiet reflection or nature", emoji: "🌿", scores: { independence: 2, energy: 1 } }
        ]
    },
    {
        text: "What's most important to you in friendships?",
        answers: [
            { text: "Loyalty and trust", emoji: "🤝", scores: { loyalty: 3, social: 2 } },
            { text: "Fun and shared experiences", emoji: "🎊", scores: { playfulness: 3, social: 3 } },
            { text: "Deep, meaningful conversations", emoji: "💬", scores: { loyalty: 2, independence: 2 } },
            { text: "Comfort and acceptance", emoji: "🤗", scores: { loyalty: 2, energy: 1 } }
        ]
    },
    {
        text: "How do you handle change?",
        answers: [
            { text: "Embrace it and adapt quickly", emoji: "🌊", scores: { independence: 2, energy: 3 } },
            { text: "Take time to process it", emoji: "🐌", scores: { independence: 3, energy: 1 } },
            { text: "Look for the opportunities", emoji: "🔍", scores: { playfulness: 2, independence: 2 } },
            { text: "Rely on my support system", emoji: "🤲", scores: { loyalty: 3, social: 2 } }
        ]
    },
    {
        text: "What's your ideal living situation?",
        answers: [
            { text: "Bustling city with lots to do", emoji: "🏙️", scores: { social: 3, energy: 3 } },
            { text: "Quiet place with nature nearby", emoji: "🏡", scores: { independence: 3, energy: 1 } },
            { text: "Close to friends and community", emoji: "🏘️", scores: { social: 3, loyalty: 2 } },
            { text: "Cozy nest I can make my own", emoji: "🛋️", scores: { independence: 2, energy: 1 } }
        ]
    },
    {
        text: "What role do you play in your friend group?",
        answers: [
            { text: "The organizer who plans everything", emoji: "📋", scores: { social: 3, loyalty: 2 } },
            { text: "The comedian who keeps it light", emoji: "😂", scores: { playfulness: 3, social: 2 } },
            { text: "The listener who gives advice", emoji: "👂", scores: { loyalty: 3, independence: 2 } },
            { text: "The flexible one who goes with the flow", emoji: "🍃", scores: { independence: 2, energy: 1 } }
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Preload any assets if needed
    console.log('Pet Personality Finder loaded');
});

// Start Quiz
function startQuiz() {
    currentQuestion = 0;
    answers = [];
    
    // Switch screens with animation
    switchScreen('landing-screen', 'quiz-screen');
    
    // Show first question
    setTimeout(() => {
        showQuestion();
    }, 300);
}

// Show Question
function showQuestion() {
    const question = questions[currentQuestion];
    const questionCard = document.getElementById('question-card');
    
    // Update progress
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = questions.length;
    document.getElementById('progress-fill').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    // Animate card
    questionCard.style.animation = 'none';
    setTimeout(() => {
        questionCard.style.animation = 'slide-up 0.4s ease';
    }, 10);
    
    // Set question text
    document.getElementById('question-text').textContent = question.text;
    
    // Build answers
    const answersGrid = document.getElementById('answers-grid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `
            <span class="answer-emoji">${answer.emoji}</span>
            <span class="answer-text">${answer.text}</span>
        `;
        btn.onclick = () => selectAnswer(index);
        
        // Stagger animation
        btn.style.opacity = '0';
        btn.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            btn.style.transition = 'all 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, index * 100);
        
        answersGrid.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(answerIndex) {
    if (isAnimating) return;
    isAnimating = true;
    
    const question = questions[currentQuestion];
    const answer = question.answers[answerIndex];
    
    // Store answer scores
    answers.push(answer.scores);
    
    // Visual feedback
    const buttons = document.querySelectorAll('.answer-btn');
    buttons[answerIndex].classList.add('selected');
    
    // Move to next question or show results
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
            isAnimating = false;
        } else {
            showLoading();
        }
    }, 400);
}

// Show Loading
function showLoading() {
    switchScreen('quiz-screen', 'loading-screen');
    
    // Calculate and show result after delay
    setTimeout(() => {
        const result = calculateResult();
        showResult(result);
    }, 2000);
}

// Calculate Result
function calculateResult() {
    // Sum up all scores
    const totals = {
        social: 0,
        energy: 0,
        loyalty: 0,
        independence: 0,
        playfulness: 0
    };
    
    answers.forEach(answer => {
        Object.keys(answer).forEach(key => {
            if (totals[key] !== undefined) {
                totals[key] += answer[key];
            }
        });
    });
    
    // Find best matching personality
    let bestMatch = null;
    let bestScore = -Infinity;
    
    Object.keys(personalities).forEach(key => {
        const personality = personalities[key];
        let score = 0;
        
        // Calculate similarity score
        Object.keys(totals).forEach(trait => {
            const diff = Math.abs(totals[trait] - personality.scores[trait]);
            score -= diff; // Lower difference = higher score
        });
        
        if (score > bestScore) {
            bestScore = score;
            bestMatch = key;
        }
    });
    
    return personalities[bestMatch];
}

// Show Result
function showResult(personality) {
    switchScreen('loading-screen', 'result-screen');
    
    // Populate result
    document.getElementById('result-emoji').textContent = personality.emoji;
    document.getElementById('result-title').textContent = personality.name;
    document.getElementById('result-tagline').textContent = personality.tagline;
    document.getElementById('result-description').textContent = personality.description;
    
    // Build traits
    const traitsGrid = document.getElementById('traits-grid');
    traitsGrid.innerHTML = '';
    personality.traits.forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'trait-tag';
        tag.textContent = trait;
        traitsGrid.appendChild(tag);
    });
    
    // Build compatibility
    const compatibilityList = document.getElementById('compatibility-list');
    compatibilityList.innerHTML = '';
    personality.compatibility.forEach(match => {
        const item = document.createElement('div');
        item.className = 'compatibility-item';
        const [emoji, ...nameParts] = match.split(' ');
        const name = nameParts.join(' ');
        item.innerHTML = `<span class="compatibility-emoji">${emoji}</span><span>${name}</span>`;
        compatibilityList.appendChild(item);
    });
}

// Switch Screen
function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    
    fromScreen.classList.remove('active');
    
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 100);
}

// Retake Quiz
function retakeQuiz() {
    currentQuestion = 0;
    answers = [];
    isAnimating = false;
    
    switchScreen('result-screen', 'landing-screen');
}

// Share Result
function shareResult() {
    const title = document.getElementById('result-title').textContent;
    const tagline = document.getElementById('result-tagline').textContent;
    const emoji = document.getElementById('result-emoji').textContent;
    
    const shareText = `I got ${emoji} ${title} — ${tagline}!\\n\\nDiscover your pet personality at PetPersonality Finder 🐾`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Pet Personality',
            text: shareText
        }).catch(err => console.log('Share cancelled'));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Result copied to clipboard! Paste it anywhere to share.');
        }).catch(() => {
            alert(shareText);
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('quiz-screen').classList.contains('active')) return;
    
    const buttons = document.querySelectorAll('.answer-btn');
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});