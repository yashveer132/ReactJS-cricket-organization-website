
---

<h1 style="text-align: center;">ReactJS Cricket Organization Website</h1>

## Live URL
<a href="https://xyz-organization.netlify.app/" style="color: blue; text-decoration: underline;" target="_blank">https://xyz-organization.netlify.app/</a>


## Introduction

Welcome to the XYZ Organization Website, a dynamic web application dedicated to cricket enthusiasts. This platform offers comprehensive features, including registration options, insights into past and upcoming tournaments, live match updates, weather information. Additionally, users can find details about coaching and training programs, along with various other resources tailored for cricket lovers. This document outlines the setup, usage, and deployment processes for the website.

## Technologies Used

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS for a responsive and customizable design.
- **Animations**: Framer Motion for smooth and engaging UI animations.
- **State Management**: React Hooks (useState, useEffect).
- **Routing**: React Router for seamless navigation.
- **API Integration**: Axios for efficient data fetching and management.
- **Deployment**: Netlify.
- **Version Control**: Git.
- **Package Manager**: npm.

## Setup and Installation

To run the project locally, please follow these steps:

1. **Clone the GitHub Repository**:
   - Open a terminal or command prompt.
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/yashveer132/ReactJS-cricket-organization-website.git
     ```
   - Navigate into the cloned project directory:
     ```bash
     cd ReactJS-cricket-organization-website
     ```

2. **Install Node.js and npm**:
   - Ensure you have [Node.js](https://nodejs.org/) (version 14 or later) installed, which includes npm (Node Package Manager). You can check your versions by running:
     ```bash
     node -v
     npm -v
     ```

3. **Install Dependencies**:
   - In the terminal or command prompt, while inside the project directory, run the following command to install the required dependencies:
     ```bash
     npm install
     ```

4. **Set Up Environment Variables**:
   - Create a new file named `.env` in the root directory of your project.
   - Add the following lines to the `.env` file:
     ```plaintext
     REACT_APP_WEATHER_API_KEY=your_weather_api_key
     REACT_APP_CRICAPI_KEY=your_cricket_api_key
     ```
   - Replace `your_weather_api_key` and `your_cricket_api_key` with your actual API keys.

5. **API Integration**:
   - This project integrates with two main APIs:
     - **Cricket API**: Provides live match updates for the LiveMatchTicker component. Obtain your API key from [https://www.cricapi.com](https://www.cricapi.com).
     - **Weather API**: Used in the WeatherWidget component to display weather details for match venues. Acquire your API key from [https://www.weatherapi.com](https://www.weatherapi.com).

   - **Note**: The application can also run using dummy data if you prefer not to utilize API keys.

6. **Run the Development Server**:
   - Start the development server by running:
     ```bash
     npm start
     ```
   - Open your web browser and navigate to `http://localhost:3000` to view the application.

## Deployment to Netlify

The project is pre-configured for deployment to Netlify. To deploy this project, follow these steps:

1. **Create a Netlify Account**:
   - Visit [Netlify](https://www.netlify.com/) and create an account if you don’t already have one.

2. **Drag and Drop Deployment**:
   - Build the project by running the following command:
     ```bash
     npm run build
     ```

   - This will generate a `build` directory containing production-ready files.
   - Navigate to Netlify's dashboard, select the "New site from drag and drop" option, and upload the `build` folder.

3. **Configure Environment Variables in Netlify**:
   - Navigate to **Site Settings** > **Build & Deploy** > **Environment** and add the necessary environment variables for your API keys.

4. **Automatic Deployment**:
   - Netlify will automatically deploy your site, providing you with a live URL for your deployed website.

## Features

1. **Landing Page (LandingPage.js)**
   - Engaging hero section with user registration option.
   - Highlighted sections for upcoming tournaments, past events,top players, etc.
   - Quick access links for seamless navigation to key areas.
  
2. **Registration Form (RegistrationForm.js)**
   - Multi-step registration form for new users.
   - Form data sent to a demo POST method.

3. **Live Match Ticker (LiveMatchTicker.js)**
   - Real-time updates on ongoing cricket matches.
   - Displays current scores, team names, and match status.
   - Automatic data refresh to ensure up-to-date information.

4. **Weather Widget (WeatherWidget.js)**
   - Current weather information for match venues.
   - Displays temperature, conditions, and relevant weather icons.
   - Aids players and fans in preparing for match conditions.

5. **Tournament Details (TournamentDetails.js)**
   - Information about upcoming and past tournaments.
   - Interactive interface for selecting and viewing tournament specifics.
   - Includes details on dates, venues, participating teams, and formats.
   - Registration options for teams in upcoming tournaments.

6. **Team Registration (TeamRegistration.js)**
   - Multi-step registration form for new teams.
   - Collects comprehensive team information, player details, and contact information.
   - Built-in validation to ensure completeness of data.

7. **Gallery (Gallery.js)**
   - A collection of images showcasing past tournaments organized by the organization.
   - Responsive grid layout for optimal viewing across devices.
   - Lightbox feature for an enhanced image viewing experience.

8. **Player Profiles (PlayerProfiles.js)**
   - Information about featured players.
   - Comprehensive statistics reflecting players' cricket records.

9. **Equipment Shop (EquipmentShop.js)**
   - E-commerce section for cricket gear and merchandise.
   - Product listings with images, descriptions, and pricing.
   - Shopping cart functionality for a streamlined purchasing experience.

10. **Training and Coaching (TrainingAndCoaching.js)**
   - Information on upcoming coaching programs and training camps.
   - Booking options for various training programs.
   - Registration and login options for coaches.

11. **Jobs and Volunteers (JobsAndVolunteers.js)**
    - Listings for job positions and volunteer opportunities.

12. **Blog (Blog.js)**
    - A collection of the latest blogs related to cricket.

13. **Contact Form (Contact.js)**
    - User-friendly form for inquiries regarding tournaments or registration.
    - Direct communication line with the XYZ Cricket Organization.
    - Inclusion of testimonials.

14. **About Us (AboutUs.js)**
    - Insights into the history and mission of the XYZ Cricket Organization.
    - Highlights of achievements and vision.
    - Information about key organizational members.

15. **Header and Footer Components (Header.js, Footer.js)**
    - Consistent navigation throughout the website.
    - Quick links to important sections.
    - Copyright information.



## Project Structure

```plaintext
src/
├── components/
│   ├── Footer.js
│   ├── Header.js
│   ├── LiveMatchTicker.js
│   └── WeatherWidget.js
├── data/
│   ├── blogPosts.js
│   ├── cardData.js
│   ├── data.js
│   ├── dummyMatches.js
│   ├── dummyWeatherData.js
│   ├── images.js
│   ├── jobListings.js
│   ├── players.js
│   ├── products.js
│   ├── stadiums.js
│   ├── testimonials.js
│   ├── tournaments.js
│   ├── trainingPrograms.js
│   ├── volunteerOpportunities.js
├── pages/
│   ├── AboutUs.js
│   ├── Blog.js
│   ├── Contact.js
│   ├── EquipmentShop.js
│   ├── Gallery.js
│   ├── JobsAndVolunteers.js
│   ├── LandingPage.js
│   ├── PlayerProfiles.js
│   ├── RegistrationForm.js
│   ├── TeamRegistration.js
│   ├── TournamentDetails.js
│   └── TrainingAndCoaching.js
├── App.js
├── index.css
└── index.js
```



## Usage

- **Landing Page**: Utilize the header navigation and quick access cards to explore different sections of the website.
- **User Registration**: Complete the multi-step form to register your details.
- **Tournament Information**: Access details on past and upcoming tournaments, register your team, and view live match updates and weather conditions for match venues.
- **Training and Coaching Programs**: Discover and register for training and coaching programs, with options for coaches to register and log in.
- **Job and Volunteer Applications**: Explore the Jobs and Volunteers page for various opportunities within the organization.
- **Gallery**: Visit the Gallery page to view images from past tournaments.
- **Top Player Profiles**: Check the Player Profiles page for insights into featured cricketers.
- **Equipment Shopping**: Browse the Equipment Shop page to view and purchase cricket gear.
- **Blog**: Explore the Blogs page for the latest articles and insights.
- **Contact**: Use the Contact page for inquiries and communication with the organization.
- **About Us**: Learn more about the history and mission of XYZ Organization.

## Responsive Design

This website is meticulously designed to be fully responsive across all devices:
- A mobile-first approach leveraging Tailwind CSS.
- Flexible layouts that seamlessly adapt to various screen sizes.
- Touch-friendly interfaces optimized for mobile devices.
- Optimized images and assets for faster loading times on mobile networks.

## Performance Optimization

- Implemented lazy loading for images and components to enhance loading times.
- Optimized bundle size through code splitting strategies.
- Minimized dependencies and selected efficient libraries to improve performance.
- Adopted caching strategies for API calls to reduce latency.
- Utilized Tailwind's purge option to eliminate unused CSS in production builds.

---

