# Divvy

Live App: [https://devinled.github.io/BillSplit/#/LandingPage](https://devinled.github.io/BillSplit/#/LandingPage)

<div align="center">
  <img src="/src/img/GitHubLogo.png" alt="Divvy Logo" width="300">
</div>

**Divvy** is a simple expense-splitting application that helps you manage shared expenses with your friends and family. With Divvy, you can easily add expenses, track balances, and view your expense history, making it convenient to settle up bills among your group.

## Sample:
<div align="center" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <div>
    <img src="/src/img/AppHome.jpg" alt="" width="300">
  </div>
  <div>
    <img src="/src/img/ReceiptSubmit.jpg" alt="" width="300">
  </div>
  <div>
    <img src="/src/img/History.jpg" alt="" width="300">
  </div>
  <div>
    <img src="/src/img/NotiAPI.jpg" alt="" width="300">
  </div>
</div>


## Features

- **Contact Management:** Easily add new contacts by providing their name, phone number, email, and initial balance. Edit existing contacts to update their information or clear their balances. You also have the option to remove contacts that are no longer needed.

- **Expense Tracking:** Add expenses and effortlessly split them among multiple contacts. You can choose to add items manually or use the convenient camera capture service to enter receipts quickly.

- **Camera Capture Service:** Simplify expense entry by capturing receipts using your device's camera. This feature streamlines the process of adding expenses to the app.

- **Mindee Receipt API Integration:** Divvy leverages the powerful Mindee Receipt API to process captured receipts intelligently. The Mindee Receipt API enables accurate and automated receipt data extraction, making expense entry faster and more accurate.

- **Expense History:** Access the last 10 submitted receipts and conveniently search expenses by contact. The expense history feature helps you keep track of previous transactions and review past expenses easily.

- **Dark Mode:** Enhance user experience by toggling between light and dark themes. Dark mode provides a comfortable viewing experience in any lighting condition.

With these powerful features and the integration of the Mindee Receipt API, Divvy empowers you to efficiently manage shared expenses with your friends and family, making the process of splitting bills and keeping track of financial transactions a breeze.

## Possible Future Features

- **Accounts with Cross-Device Sync:** I am exploring the implementation of user accounts, allowing you to access your expense data across multiple devices seamlessly. With cross-device sync, you can manage your shared expenses anytime, anywhere, without missing a beat.

- **Real-time Communication between Contacts:** I envision a feature that enables real-time communication between contacts within the app. Contacts will be able to interact, discuss expenses, and keep each other updated with live balance changes.

- **Enhanced Receipt API Integration:** As technology evolves, I aim to integrate a more advanced receipt API that offers even greater accuracy and automation. This will further streamline the expense entry process, saving you time and effort.

- **Custom Categories and Tags:** Personalize your expense management by adding custom categories and tags to transactions. This will enable better organization and analysis of expenses.

- **Expense Reports and Analytics:** I plan to introduce comprehensive expense reports and analytics to help you gain insights into your spending patterns and make informed financial decisions.

- **Multi-Currency Support:** For our international users, I intend to add multi-currency support, making it convenient to manage expenses across different currencies.

- **Expense Reminders and Notifications:** Stay on top of your shared expenses with built-in reminders and notifications. Set due dates for payments and receive alerts to avoid missing any important transactions.

## Technologies Used

- **React:** A popular JavaScript library for building user interfaces.
- **React Router:** A library for routing in a React application.
- **React Icons:** Provides a collection of customizable icons for React applications.
- **React Transition Group:** Adds animations and transitions to React components.
- **Tailwind CSS:** A utility-first CSS framework used for styling the application.
- **Github Pages:** Hosts the application on Github Pages for easy access.

## Getting Started

To get started with Divvy, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DevinLed/BillSplit.git
    ```

2. **Install dependencies:** Navigate to the project directory and install the required dependencies using npm or yarn.

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. **Run the application:** Start the development server to run the application locally.

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

4. **Open in Browser:** The application will be running on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to access Divvy.

## Contributing

Contributions to Divvy are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

To contribute to Divvy, follow these steps:

1. **Fork the repository.**

2. **Create your feature branch:** 

    ```bash
    git checkout -b feature/my-new-feature
    ```

3. **Commit your changes:** 

    ```bash
    git commit -am 'Add some feature'
    ```

4. **Push to the branch:** 

    ```bash
    git push origin feature/my-new-feature
    ```

5. **Create a new Pull Request:** 

    Open a pull request from your forked repository to the original repository's `main` branch.

## License

This project is open-source and available under the MIT License.


## Acknowledgements

Special thanks to my coach, Jacob Critch, for his invaluable support throughout the development process. Jacob provided guidance, helped with ideas, resolved bugs, and offered valuable insights into design issues. I am grateful for his availability to brainstorm ideas and the insightful 1-on-1 sessions that improved this project significantly. His mentorship has been instrumental in making Divvy a better expense sharing solution.
