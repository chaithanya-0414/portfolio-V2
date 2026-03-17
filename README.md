# Portfolio Website

Welcome to my personal portfolio website source code. This project showcases my skills, background, and projects in Data Analytics, Machine Learning, and Freelance Presentation Design.

## 🚀 Live Demo
[View Live Portfolio]

## 🛠 Features
- **Responsive Design**: Works on Desktop, Tablet, and Mobile.
- **Dynamic Projects**: Showcases ML and Data Analysis projects with links.
- **Freelance Section**: Dedicated section for Presentation Design work with an interactive, collapsible file viewer.
- **Automation**: Includes a Python script (`update_portfolio.py`) to automatically update the freelance section when new files are added.

## 📂 Structure
- `index.html`: Main website structure.
- `style.css`: Custom styling and animations.
- `images/`: Stores profile pictures, project icons, and assets.
- `freelance_work/`: Drop your freelance PPTs/PDFs here.
- `update_portfolio.py`: Script to update `index.html` with new files from `freelance_work/`.

## 🤖 Automation Workflow
To add new freelance work:
1.  Place your `.pptx`, `.pdf`, or `.docx` files in the `freelance_work` folder.
2.  Run the automation script:
    ```bash
    python update_portfolio.py
    ```
3.  The `index.html` file will be automatically updated with the new files.
4.  Commit and push your changes to GitHub.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
