<template>
    <div class="container mx-auto  px-4">
        <section class="flex flex-col justify-center items-center  text-white">
            <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
                ChatBot
            </h1>
            <!-- Chat Messages Area -->
            <div ref="chatBody" class=" p-6 space-y-6"></div>

            <!-- Message Input Form -->
            <form @submit.prevent="handleOutgoingMessage" class="flex gap-2 w-full ">
                <textarea v-model="message" @keydown="handleKeyDown" ref="messageInput"
                    placeholder="Type your message..." rows="2"
                    class="flex-1  bg-gray-700 text-white border px-5 max-h-[50px] border-gray-600 rounded-lg resize-none focus:outline-none focus:ring focus:ring-secondary"></textarea>
                <button type="submit" :disabled="isGenerating"
                    class="h-fit w-full rounded-xl bg-hookYellow px-10 py-2.5 text-lg font-bold capitalize tracking-wider text-black md:w-fit">
                    Send </button>
            </form>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ====================
// API Configuration
// ====================
const API_KEY = 'AIzaSyAldzdCk4LKK2jl6gUBj7n4GGE2-2gvPok'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

// ====================
// Reactive References
// ====================
const chatBody = ref(null)
const messageInput = ref(null)
const message = ref('')
const isGenerating = ref(false)

// ====================
// Utility Functions
// ====================

/**
 * Sanitize user input to prevent XSS
 */
const sanitizeHTML = (str) => {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
}

/**
 * Scroll chat body to the bottom
 */
const scrollToBottom = () => {
    if (chatBody.value) {
        chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
}

/**
 * Create and append a chat message bubble
 */
const createMessage = (html, isUser = false, isThinking = false) => {
    const wrapper = document.createElement('div')
    wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`

    const bubble = document.createElement('div')
    bubble.className = `
      max-w-[75%] px-4 py-3 rounded-lg shadow
      ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}
    `

    if (isThinking) {
        bubble.innerHTML = `
        <div class="flex gap-1">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        </div>
      `
        wrapper.classList.add('bot-thinking')
    } else {
        bubble.innerHTML = html
    }

    wrapper.appendChild(bubble)
    chatBody.value.appendChild(wrapper)
    scrollToBottom()
    return bubble
}

/**
 * Fetch response from Gemini AI model
 */
const generateBotResponse = async (container, userMessage) => {
    if (isGenerating.value) {
        container.innerHTML = '<p class="text-red-400">Please wait for the current response to complete.</p>'
        return
    }

    isGenerating.value = true

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.error?.message || `HTTP error: ${response.status}`)

        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (!botText) throw new Error('Invalid response format')

        container.innerHTML = `<p>${sanitizeHTML(botText)}</p>`
    } catch (error) {
        console.error(error)
        let fallback = 'An error occurred.'

        if (!navigator.onLine) {
            fallback = 'No internet connection.'
        } else if (error.message.includes('API key')) {
            fallback = 'Invalid API key.'
        } else if (error.message.includes('quota')) {
            fallback = 'API quota exceeded.'
        }

        container.innerHTML = `<p class="text-red-400">${fallback}</p>`
    } finally {
        isGenerating.value = false
    }
}

// ====================
// Event Handlers
// ====================

const handleOutgoingMessage = () => {
    const userMsg = message.value.trim()
    if (!userMsg || userMsg.length > 1000) return

    // Display user message
    createMessage(`<p>${sanitizeHTML(userMsg)}</p>`, true)
    message.value = ''

    // Show thinking indicator
    const botBubble = createMessage('', false, true)

    // Generate bot response
    generateBotResponse(botBubble, userMsg)
}

const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (!isGenerating.value) handleOutgoingMessage()
    }
}

onMounted(() => {
    messageInput.value.focus()
})
</script>

<style scoped>
.bot-thinking .animate-bounce {
    animation: bounce 1.2s infinite;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}
</style>