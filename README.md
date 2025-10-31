# Argus: The Crowdsourced Lost & Found Platform

## Overview

Argus is a crowdsourced lost & found platform that allows users to report lost belongings or share items they’ve found all through a single, centralized system. It eliminates the problem of scattered and unorganized lost & found information by providing a structured, community-driven solution.

## Features

1. Item Spaces
   - Admins can create predefined spaces (such as campus, hostel, office, or event) to help users easily locate and manage items relevant to a specific place.

2. Detailed Item Posts
   - Users can create posts for lost or found items, including information such as the item’s name, last seen location, image, and additional remarks or descriptions.

3. Email OTP Authentication
   - A secure 6-digit OTP is sent to the user’s email to verify identity and ensure trusted participation on the platform.
   - Upon successful verification, a session is created to maintain the user’s login state and enable seamless access across the platform

4. Role-Based Access Control (RBAC)
   - Two roles are supported: Admin and User.
   - Admins can create or delete item spaces and manage all posts.
   - Users can create, edit, and manage their own posts.

5. User Dashboard
   - Displays all posts created by the user, along with options to edit, delete, or mark items as resolved once found.

## Screenshots
<img width="1919" height="952" alt="Screenshot 2025-10-29 142232" src="https://github.com/user-attachments/assets/0760117d-a641-448b-bb6d-19f696feb6f9" />

<img width="1919" height="953" alt="Screenshot 2025-10-29 143825" src="https://github.com/user-attachments/assets/5f59d03c-b336-4692-9c55-bc7c5b111535" />
<img width="1919" height="949" alt="Screenshot 2025-10-29 225151" src="https://github.com/user-attachments/assets/54769f93-2bba-4b01-8de1-ea5d18911ec3" />

<img width="1919" height="948" alt="Screenshot 2025-10-29 143810" src="https://github.com/user-attachments/assets/07435e9e-3a2b-41af-aea7-4a73405bd7fd" />
<img width="1919" height="950" alt="Screenshot 2025-10-29 142148" src="https://github.com/user-attachments/assets/119c268a-538d-46dd-8e7c-5c2e30849712" />


## Upcoming Features
1. Google Oauth integration
2. Comment section for each post
3. Notify the user when some item is found 

## Tech Stack

### Frontend

- **Vite** + **React** + **TypeScript** —> for a fast, type-safe, and modular UI development experience.
- **Tailwind CSS** —> for responsive and customizable styling.
- **shadcn/ui** —> for elegant, prebuilt UI components with consistent design.

### Backend

- **Appwrite** —> handles authentication, database, and storage .
  - Auth → Manages user signin via Email OTP and session handling.
  - Database → Stores user posts, item details, and space information.
  - Storage → Handles image uploads and retrieval for lost/found items.

## Installation

1. Clone the Repository

```
git clone https://github.com/Waqibsk/Appwrite-Hackathon-2025.git
cd Appwrite-Hackathon-2025
```

2. Install Dependencies

```
npm install
```

3. Create a `.env` file refering to `.env.example`

```ini
VITE_API_ENDPOINT="Your Appwrite API endpoint"
VITE_PROJECT_ID="Your Appwrite Project Id"
VITE_DATABASE_ID="Your Appwrite Database Id"
VITE_USER_COLLECTIONS_ID="Your User collection table Id"
VITE_SPACES_COLLECTIONS_ID="Your spaces collection table Id"
VITE_ITEMS_COLLECTIONS_ID="Your Items table Id"
VITE_ADMIN_ID="Your Appwrite Admin user Id"
VITE_BUCKET_ID="Your Appwrite bucket Id"
```

4. Setup Development Server

```
npm run dev
```
