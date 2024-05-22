# Trading Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.3-blue.svg)
![React](https://img.shields.io/badge/React-17.0.2-blue.svg)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the Project

The Trading Platform is a robust web application that allows users to trade financial instruments in real-time. The platform is designed to provide a seamless and intuitive user experience, leveraging modern web technologies to ensure performance and security.

## Features

- **User Authentication**: Secure login, registration, and password recovery.
- **Real-time Trading**: Execute trades and track portfolios in real-time.
- **User Dashboard**: Personalized dashboard to view and manage trading activities.
- **Responsive Design**: Accessible on all devices from desktops to mobile phones.
- **Secure API**: All endpoints are protected with proper authentication and authorization checks.

## Built With

This project is built using the following technologies:

- [Next.js](https://nextjs.org/) - The React Framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js & TypeScript

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- Docker (for running the database in a container)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/triffalin/trading_platform.git
   ```

2. Install NPM packages

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   Create a `.env.local` file in the root of your project and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_CLIENT_ID=your_facebook_client_id
   FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Running Tests

To run tests, run the following command:

```sh
npm test
# or
yarn test
```

### Building for Production

To build the project for production, run the following command:

```sh
npm run build
# or
yarn build
```

## Contributing

Contributions are what make the open-source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@TriffAlin](https://x.com/TriffAlin) - triffalin@gmail.com

Project Link: [https://github.com/triffalin/trading_platform](https://github.com/triffalin/trading_platform)

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
