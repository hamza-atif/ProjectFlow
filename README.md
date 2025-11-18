# ProjectFlow - Enterprise Project Management

![ProjectFlow Dashboard](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)

## Overview

ProjectFlow is a modern, enterprise-grade project management solution designed for teams of all sizes. Built with Next.js, Tailwind CSS, and shadcn/ui, it offers a comprehensive suite of tools for managing projects, tracking time, and collaborating with team members.

## Features

- **Intuitive Dashboard**: Get a quick overview of all your projects, tasks, and team activities
- **Project Management**: Create, track, and manage projects with detailed progress tracking
- **Team Collaboration**: Connect with team members, view availability, and manage resources
- **Time Tracking**: Built-in time tracker for accurate project time management
- **Detailed Reports**: Generate comprehensive reports on projects, time, and team performance
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Mode**: Choose between dark and light themes based on your preference
## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Switching**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-flow.git
   cd project-flow
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
project-flow/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   ├── projects/         # Projects page
│   ├── reports/          # Reports page
│   ├── settings/         # Settings page
│   ├── team/             # Team page
│   └── time/             # Time tracking page
├── components/           # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── theme-provider.tsx # Theme provider component
│   ├── theme-toggle.tsx  # Theme toggle component
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```
## Customization

### Themes

ProjectFlow comes with both light and dark themes. You can customize the colors in the `app/globals.css` file.

### Adding New Features

The modular architecture makes it easy to add new features:

1. Create new components in the `components` directory
2. Add new pages in the `app` directory
3. Update the navigation in `components/dashboard/shell.tsx`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Recharts](https://recharts.org/) for the charting library
- [Lucide React](https://lucide.dev/) for the icon set

---

Built with ❤️ by Hamza Atif