<template>
    <div class="container mx-auto min-h-full px-4 text-white">
        <section>

            <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
                Add Posts
            </h1>
            <div class=" flex items-center justify-center  text-white p-6">

                <div class="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl p-8">
                    <form @submit.prevent="submitPost">
                        <div class="mb-4">
                            <label for="content" class="block font-medium mb-2">Post Content</label>
                            <textarea id="content" v-model="content" rows="6"
                                class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your post here..."></textarea>
                            <p v-if="errors.content" class="text-red-400 mt-2 text-sm">{{ errors.content }}</p>
                        </div>

                        <button type="submit"
                            class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105"
                            :disabled="loading">
                            {{ loading ? 'Submitting...' : 'Publish Post' }}
                        </button>

                        <p v-if="message"
                            :class="`mt-4 text-center font-medium ${error ? 'text-red-400' : 'text-green-400'}`">
                            {{ message }}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch, useRuntimeConfig } from '#app'
import * as yup from 'yup'

// State
const content = ref('')
const message = ref('')
const loading = ref(false)
const error = ref(false)
const errors = ref({})


const router = useRouter()
// Runtime config
const config = useRuntimeConfig()
const token = useCookie('token')

// Yup schema
const schema = yup.object({
    content: yup.string().required('Post content is required').min(10, 'Post must be at least 10 characters'),
})

// Submit function
const submitPost = async () => {
    loading.value = true
    message.value = ''
    error.value = false
    errors.value = {}

    try {
        // ✅ Validate form
        await schema.validate({ content: content.value }, { abortEarly: false })

        // ✅ Post request
        const { error: fetchError } = await useFetch(`${config.public.BaseApi}/Posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
            body: { content: content.value },
        })

        if (fetchError.value) {
            throw new Error(fetchError.value.message)
        }

        message.value = 'Post published successfully!'
        content.value = ''
        setTimeout(() => {
            router.push("/community")
        }, 100);
    } catch (err) {
        if (err.name === 'ValidationError') {
            err.inner.forEach(e => {
                errors.value[e.path] = e.message
            })
        } else {
            error.value = true
            message.value = 'An error occurred. Please try again.'
            console.error(err)
        }
    } finally {
        loading.value = false
    }
}
</script>
