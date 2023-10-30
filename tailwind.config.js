/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{vue,js,ts,jsx,tsx}',
        './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false, // 添加这一行
    },
}

