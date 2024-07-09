-- Users Table

-- Stores information about users.

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    uid_google NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

--Example

INSERT INTO Users (name, email, uid_google, phone) VALUES
(N'John Doe', N'john.doe@example.com', N'password123', N'1234567890'),
(N'Jane Smith', N'jane.smith@example.com', N'password123', N'0987654321');

select * from Users where 'email' = 'dummy@gmail.com';


--Booking Table

CREATE TABLE Bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id NVARCHAR(255) NOT NULL,
    phone_number NVARCHAR(20),
    service_title NVARCHAR(255),
    service_price DECIMAL(10, 2),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    unique_identifier NVARCHAR(12) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

select * from Bookings where unique_identifier = '73322f78fa88';



---- Below are future Iterations

--CREATE TABLE Services (
--    service_id INT IDENTITY(1,1) PRIMARY KEY,
--    created_at DATETIME NOT NULL DEFAULT GETDATE()
--);

----Example Values
--INSERT INTO Services (created_at) VALUES
--(GETDATE()),
--(GETDATE());


---- Service Translations Table
---- Stores translations for service names and descriptions.

--CREATE TABLE ServiceTranslations (
--    translation_id INT IDENTITY(1,1) PRIMARY KEY,
--    service_id INT,
--    language_code NVARCHAR(5) NOT NULL, -- 'en' for English, 'ur' for Urdu, etc.
--    name NVARCHAR(255) NOT NULL,
--    description NVARCHAR(MAX),
--    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE CASCADE
--);

---- Example Values
--INSERT INTO ServiceTranslations (service_id, language_code, name, description) VALUES
--(1, N'en', N'Cleaning Service', N'Professional cleaning service.'),
--(1, N'ur', N'صفائی کی خدمت', N'پروفیشنل صفائی کی خدمت۔'),
--(2, N'en', N'Plumbing Service', N'Expert plumbing services for your home.'),
--(2, N'ur', N'پلمبنگ کی خدمت', N'آپ کے گھر کے لیے ماہر پلمبنگ خدمات۔');



---- Service Providers Table
---- Stores information about service providers.

--CREATE TABLE ServiceProviders (
--    provider_id INT IDENTITY(1,1) PRIMARY KEY,
--    name NVARCHAR(255) NOT NULL,
--    email NVARCHAR(255) UNIQUE NOT NULL,
--    phone NVARCHAR(20),
--    created_at DATETIME NOT NULL DEFAULT GETDATE()
--);


----Examples:
--INSERT INTO ServiceProviders (name, email, phone) VALUES
--(N'Mike Johnson', N'mike.johnson@example.com', N'1231231234'),
--(N'Alice Brown', N'alice.brown@example.com', N'3213214321');



---- Provider Services Table
---- Links service providers to services they offer

--CREATE TABLE ProviderServices (
--    provider_service_id INT IDENTITY(1,1) PRIMARY KEY,
--    provider_id INT,
--    service_id INT,
--    price DECIMAL(10, 2) NOT NULL,
--    FOREIGN KEY (provider_id) REFERENCES ServiceProviders(provider_id),
--    FOREIGN KEY (service_id) REFERENCES Services(service_id)
--);

--INSERT INTO ProviderServices (provider_id, service_id, price) VALUES
--(1, 1, 50.00),
--(1, 2, 75.00),
--(2, 1, 60.00),
--(2, 2, 80.00);


---- Bookings Table
---- Stores information about service bookings.

--CREATE TABLE Bookings (
--    booking_id INT IDENTITY(1,1) PRIMARY KEY,
--    user_id INT,
--    provider_service_id INT,
--    booking_date DATE NOT NULL,
--    booking_time TIME NOT NULL,
--    status NVARCHAR(50),
--    created_at DATETIME NOT NULL DEFAULT GETDATE(),
--    FOREIGN KEY (user_id) REFERENCES Users(user_id),
--    FOREIGN KEY (provider_service_id) REFERENCES ProviderServices(provider_service_id)
--);

----Example:

--INSERT INTO Bookings (user_id, provider_service_id, booking_date, booking_time, status, created_at) VALUES
--(1, 1, '2024-07-10', '10:00:00', N'Confirmed', GETDATE()),
--(2, 3, '2024-07-11', '14:00:00', N'Pending', GETDATE());




---- Reviews Table
---- Stores reviews for services provided.

--CREATE TABLE Reviews (
--    review_id INT IDENTITY(1,1) PRIMARY KEY,
--    user_id INT,
--    provider_service_id INT,
--    rating INT CHECK (rating >= 1 AND rating <= 5),
--    comment NVARCHAR(MAX),
--    created_at DATETIME NOT NULL DEFAULT GETDATE(),
--    FOREIGN KEY (user_id) REFERENCES Users(user_id),
--    FOREIGN KEY (provider_service_id) REFERENCES ProviderServices(provider_service_id)
--);

----Example:

--INSERT INTO Reviews (user_id, provider_service_id, rating, comment, created_at) VALUES
--(1, 1, 5, N'Excellent service!', GETDATE()),
--(2, 2, 4, N'Very good, but can be improved.', GETDATE());