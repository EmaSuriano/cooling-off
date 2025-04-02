# 🛒 Cooling-Off Period Purchase Assistant

A web application designed to help you make more intentional purchasing decisions by implementing a "cooling-off period" for non-essential purchases.

![App Screenshot](https://picsum.photos/seed/coolingoff/800/400)

## 🌟 Features

- **Purchase Assessment**: Determine whether a potential purchase is essential or non-essential
- **Automated Cooling-Off Periods**: Get recommended waiting periods based on price (24 hours to 30 days)
- **Visual Progress Tracking**: See how much time is left in your cooling-off period with an interactive progress bar
- **Persistent Storage**: Your waiting list is saved even if you close the browser
- **Dark Mode Support**: Automatically adapts to your system preferences
- **Mobile-Friendly**: Works on all device sizes

## 🧠 The Psychology Behind It

The Cooling-Off Period Purchase Assistant is based on behavioral economics and the psychology of spending:

- **Reduces Impulse Purchases**: Creating a time buffer between wanting something and buying it helps eliminate emotional, impulsive decisions
- **Counters Retail Manipulation**: Helps you resist sales tactics designed to create urgency
- **Promotes Mindful Spending**: Encourages you to consider whether a purchase truly aligns with your values and financial goals
- **Builds Better Habits**: Over time, helps you develop more conscious consumption patterns

## 🚀 Quick Start

Visit the [live demo](https://yourusername.github.io/cooling-off-app/) to try it out immediately!

To run locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/cooling-off-app.git
cd cooling-off-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 💻 Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **localStorage** - Persistent data storage

## 🗂️ Project Structure

```
src/
├── components/            # UI components
│   ├── EssentialResult    # Display for essential purchases
│   ├── NonEssentialResult # Display for non-essential purchases
│   ├── PurchaseForm       # Form to input purchase details
│   ├── TimerProgressBar   # Visual progress indicator
│   └── WaitingList        # List of items in cooling-off period
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
├── types.ts               # TypeScript type definitions
└── index.css              # Global styles
```

## 🤔 How to Use

1. **Input Purchase Details**:

   - Enter the item name, price, whether it's essential, and why you want it
   - Submit the form to get a recommendation

2. **Review the Assessment**:

   - For essential purchases, you'll get budgeting tips
   - For non-essential purchases, you'll get a recommended cooling-off period

3. **Monitor Your Waiting List**:

   - Add non-essential purchases to your waiting list
   - Watch the progress bar as time passes
   - When the cooling-off period ends, decide if you still want the item

4. **Make Mindful Decisions**:
   - Remove items you no longer want
   - Feel good about purchases you decide to make after careful consideration

## 🧪 Future Plans

- [ ] User accounts for syncing across devices
- [ ] Email reminders when cooling-off periods end
- [ ] Budget integration for financial context
- [ ] Historical purchase patterns and insights
- [ ] Browser extension for automatic detection of shopping sites

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ to promote mindful consumption
