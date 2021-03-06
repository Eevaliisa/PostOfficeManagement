# Welcome to Post Office Management Application

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Graphical examples](#graphic-example-pages-from-the-app)

## General info
This project is a simple application for managing post office shipments. The home page show users a list of shipments.
Additionally users can:
 * create new shipments 
 * create and add new bags with parcels or letters to shipments with the same destination
 * create parcels and add them to specifig bags
 * there's a possibility to finalize a shipment so no more bags can be added
	
## Technologies
Project is created with:
* .NET Core 5.0 SDK - [Download](https://dotnet.microsoft.com/download)
* C# 8.0
* Microsoft SQL Server version 5.0.1 
* Entity Framework version 6.4.4
* Node.js
* React 16
* Bootstrap 4
	
## Setup
To run this project:
First install .NET CORE SDK [You can download it here](https://dotnet.microsoft.com/download). You may need to restart your computer after installation.
<br>
Then install SQL server Express version [You can download it here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
<br>
After installation copy and save the given connetcion string and check if it matches the one in "appsettings.json", leave database name as it is.

In main project folder (post-office-management) directory, run the commands:
- `dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 5.0.1`
- `dotnet tool install --global dotnet-ef --version 5.0.1`
- `dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.1`
- And for applying migrations run: `dotnet ef database update`

- Now move to ClientApp directory: `cd ClientApp`
- Run the command: `npm install`

- Then in main project folder run command: `dotnet run`

- In ClientApp directory run: `npm start`

You can now access the app at http://localhost:5000/

Database is seeded with a small amount of example data. Happy exploring!

## Graphic example pages from the app
![Add Shipment](post-office-add-shipment-page.png)
![Bags List](post-office-get-bags-list-page.png)

