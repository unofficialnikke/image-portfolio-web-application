## Image Portfolio Platform :camera:
This Image portfolio web-application called Lokki portfolio is a full stack web-application where user can showcase their photographs. This is a project part of my thesis topic. 

The Lokki portfolio is a platform for every photographer who are willing to showcase their photographs. Users can expand their network by finding new interesting Photography accounts to follow in Instagram or find new contact. 
This platform is for both photographers and potential customers seekins a photographer. 

![sovellus_etusivu2](https://github.com/user-attachments/assets/c76cc072-284a-43d7-8596-9f7ea2d38df6)

## Features :mag:

### User Authentication
- Register and login with email and password.
- JWT tokens for session management.
- Role-based access control (Admin vs. User).
### Image Upload
- Upload images with restrictions on the number of images per user (max 10 images).
- Images are processed using sharp for resizing and rotation before being uploaded to AWS S3.
- Supports image favorite marking that show images on home page.
### Profile Management
- Users can update their profile information, including profile text, categories and social media links.
- Users can assign up to 5 categories to their profiles.
### CRUD operations
- CRUD (create, read, update, delete) operations for user profiles, categories, social media and images

![sovellus_profiili](https://github.com/user-attachments/assets/dd73273d-da62-4e84-94f3-6e215a7a44ff)

## Used technologies :hammer:
- **Frontend:** React  
- **Styling:** Sass (for styling the frontend)  
- **Backend:** Node.js, Express  
- **Authentication:** JSON Web Tokens (JWT)  
- **Database:** PostgreSQL  
- **File Storage:** AWS S3 for images

## Database of the application: :wrench:

![portfolioalusta_tietokanta](https://github.com/user-attachments/assets/28e3872e-24c0-4498-939c-8e0d783bd607)


