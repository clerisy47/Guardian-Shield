# Guardian-Shield Extension

## Overview

Guardian-Shield is a browser extension designed to enhance your online security by detecting and preventing common fraud and phishing attempts in your emails. The extension provides three key features:

## Key Features

1. **Phishing Alert:** Guardian-Shield gives you instant alerts when it detects potential phishing systems, helping you stay vigilant against malicious activities.

2. **Terms and Conditions Summarizer:** The extension summarizes terms and conditions in your emails, making you aware of possible exploits and ensuring that you have a clear understanding of the content.

3. **Fraud Probability Indicator:** Guardian-Shield calculates and displays the probability of an email being fraudulent, allowing you to prioritize and take action accordingly.

You can always suggest new feature or code your own in this extension by contacting us [here](#contact-and-support)

## Installation

To secure your online interface, follow these installation steps:

BTW, we're publishing our extension to chrome and firefox mobile browser. It takes around 7 days for google to accept it and we're hosting the backend at aws too. So, you don't need to hustle it in near time except simple extension installation

1. Clone the project's GitHub repository:

   ```bash
   git clone https://github.com/clerisyutsav47/Guardian-Shield.git
   ```
2. Change directory to the project folder:

    ```bash
    cd Guardian-Shield
    ```

3. Install the necessary python dependencies:

    ```bash
    pip install -r requirements.txt
    ```
3. Run `download_models.py` to download the necessary machine learning models.
4. Execute `app.py` to launch the FastAPI backend.
Or simply
```bash
    python download_models.py
    python app.py
```

6. Load the extension in Chrome by enabling Developer Mode and adding the extension folder.

## Contributors

[Sadina Upreti](https://github.com/Sadina61)    
[Utsav Acharya](https://github.com/clerisyutsav47)    
[Darshan Kumar Paudyal](https://github.com/Darshan808)    

## FAQs

### Q: Is this application suitable for seniour citizens?
A: Absolutely! This application is an excellent way to prevent online frauds to senior citizens. In facts it was inspired by how our parents got into these frauds frequently.

### Q: Can I contribute to this project?
A: Of course! We welcome contributions from developers, educators or even if you have any idea. Please refer to the Contributing section for guidelines.

## License

Guardian-Shield is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact and Support

For any questions, issues, or if you want to suggest new features, please contact clerisyutsav47@gmail.com or send a pull request.

Thank you for choosing Guardian-Shield for a safer online experience!
