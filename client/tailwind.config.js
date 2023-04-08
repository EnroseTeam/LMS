/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'xs-regular': [
          '13px',
          {
            lineHeight: '15px',
            fontWeight: '400',
          },
        ],
        'xs-medium': [
          '13px',
          {
            lineHeight: '15px',
            fontWeight: '500',
          },
        ],
        'sm-regular': [
          '14px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        'sm-medium': [
          '14px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
        'md-regular': [
          '15px',
          {
            lineHeight: '26px',
            fontWeight: '400',
          },
        ],
        'md-medium': [
          '15px',
          {
            lineHeight: '18px',
            fontWeight: '500',
          },
        ],
        'base-regular': [
          '16px',
          {
            lineHeight: '36px',
            fontWeight: '400',
          },
        ],
        'base-medium': [
          '16px',
          {
            lineHeight: '19px',
            fontWeight: '500',
          },
        ],
        'lg-regular': [
          '17px',
          {
            lineHeight: '36px',
            fontWeight: '400',
          },
        ],
        'lg-medium': [
          '17px',
          {
            lineHeight: '26px',
            fontWeight: '500',
          },
        ],
        'xl-medium': [
          '18px',
          {
            lineHeight: '21px',
            fontWeight: '500',
          },
        ],
        '2xl-medium': [
          '24px',
          {
            lineHeight: '28px',
            fontWeight: '500',
          },
        ],
        '2xl-bold': [
          '24px',
          {
            lineHeight: '28px',
            fontWeight: '700',
          },
        ],
        '3xl-medium': [
          '30px',
          {
            lineHeight: '35px',
            fontWeight: '500',
          },
        ],
        '3xl-bold': [
          '30px',
          {
            lineHeight: '35px',
            fontWeight: '700',
          },
        ],
        '4xl-bold': [
          '45px',
          {
            lineHeight: '53px',
            fontWeight: '700',
          },
        ],
      },
      colors: {
        head: '#140342',
        text: '#4F547B',
        'color-1': '#6440FB',
        'color-2': '#1A064F',
        'color-3': '#282664',
        'color-4': '#E8543E',
        'color-6': '#00FF84',
        'bg-1': '#F7F8FB',
        'bg-2': '#E5F0FD',
        'bg-3': '#F5F7FE',
        'bg-4': '#EEF2F6',
        'bg-5': '#FEFBF4',
        icon: '#6A7A99',
        'border-1': '#EDEDED',
        'border-2': '#DDDDDD',
      },
      boxShadow: {
        'shadow-1': '0px 6px 15px rgba(64, 79, 104, 0.05)',
        'shadow-2': '0px 40px 30px rgba(25, 25, 46, 0.04)',
        'shadow-3': '0px 20px 30px rgba(25, 25, 46, 0.04)',
        'shadow-4': '0px 25px 70px rgba(1, 33, 58, 0.07)',
        'shadow-dashboard': '0px 1px 4px rgba(20, 3, 66, 0.07)',
      },
    },
  },
  plugins: [],
};
