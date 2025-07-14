#!/usr/bin/env python3
"""
🚀 GitHub Profile README Generator
Creates stunning, professional GitHub Profile README.md files with advanced features.

Author: AI Assistant
Version: 1.0.0
"""

import json
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional
import argparse

class GitHubReadmeGenerator:
    """
    Advanced GitHub Profile README Generator with comprehensive features
    """
    
    def __init__(self):
        self.config = {}
        self.template_sections = [
            "hero_section",
            "about_me", 
            "what_sets_apart",
            "tech_stack",
            "github_stats",
            "currently_working",
            "pinned_projects",
            "custom_sections",
            "tools_daily",
            "connect_me",
            "sponsor_section",
            "call_to_action"
        ]
    
    def load_config(self, config_file: str = "config.json") -> Dict:
        """Load user configuration from JSON file"""
        if os.path.exists(config_file):
            with open(config_file, 'r', encoding='utf-8') as f:
                self.config = json.load(f)
                print(f"✅ Loaded configuration from {config_file}")
        else:
            print(f"⚠️  Configuration file {config_file} not found. Creating interactive setup...")
            self.create_interactive_config()
        return self.config
    
    def create_interactive_config(self):
        """Interactive configuration setup"""
        print("\n🎯 Welcome to the Advanced GitHub Profile README Generator!")
        print("Let's create your stunning profile README step by step...\n")
        
        # Basic Information
        self.config["basic_info"] = {
            "name": input("Your Name: "),
            "github_username": input("GitHub Username: "),
            "tagline": input("Your Tagline (e.g., 'Code. Create. Contribute. 🚀'): "),
            "typing_animation": input("Typing animation text (optional): ") or None
        }
        
        # About Me
        print("\n📝 About Me Section:")
        about_lines = []
        for i in range(3):
            line = input(f"About line {i+1} (press Enter to skip): ")
            if line:
                about_lines.append(line)
        
        self.config["about_me"] = {
            "description": about_lines,
            "quotes": [
                input("Motivational quote 1 (optional): ") or "First solve the problem, then write the code.",
                input("Motivational quote 2 (optional): ") or "Bad code runs. Clean code grows."
            ]
        }
        
        # Tech Stack
        print("\n🛠️ Tech Stack:")
        self.config["tech_stack"] = {
            "languages": input("Languages (comma-separated): ").split(','),
            "frameworks": input("Frameworks (comma-separated): ").split(','),
            "cloud_devops": input("Cloud/DevOps tools (comma-separated): ").split(','),
            "tools_editors": input("Tools/Editors (comma-separated): ").split(',')
        }
        
        # Currently section
        print("\n📚 Currently Section:")
        self.config["currently"] = {
            "working_on": input("🔭 Working on: "),
            "learning": input("🌱 Learning: "),
            "collaborating": input("👯‍♂️ Open to collaborating on: "),
            "exploring": input("🧠 Exploring: "),
            "reach_me": input("📫 How to reach me: ")
        }
        
        # Social Links
        print("\n📬 Social Links:")
        self.config["social_links"] = {
            "portfolio": input("Portfolio URL (optional): ") or None,
            "email": input("Email (optional): ") or None,
            "linkedin": input("LinkedIn URL (optional): ") or None,
            "twitter": input("Twitter/X URL (optional): ") or None,
            "blog": input("Blog/Dev.to URL (optional): ") or None,
            "buymeacoffee": input("Buy Me a Coffee URL (optional): ") or None
        }
        
        # Save configuration
        with open("config.json", 'w', encoding='utf-8') as f:
            json.dump(self.config, f, indent=2)
        print("\n✅ Configuration saved to config.json")
    
    def generate_badges(self, items: List[str], category: str) -> str:
        """Generate styled badges for tech stack items"""
        if not items or (len(items) == 1 and not items[0].strip()):
            return ""
        
        badges = []
        color_map = {
            "languages": "blue",
            "frameworks": "green", 
            "cloud_devops": "orange",
            "tools_editors": "purple"
        }
        
        color = color_map.get(category, "blue")
        
        for item in items:
            item = item.strip()
            if item:
                # Create shield.io badge
                badge = f"![{item}](https://img.shields.io/badge/-{item.replace(' ', '%20')}-{color}?style=flat-square&logo={item.lower().replace(' ', '')}&logoColor=white)"
                badges.append(badge)
        
        return " ".join(badges)
    
    def generate_readme(self) -> str:
        """Generate the complete README.md content"""
        readme_content = []
        
        # Hero Section
        readme_content.append(self._generate_hero_section())
        
        # About Me
        readme_content.append(self._generate_about_section())
        
        # What Sets Apart
        readme_content.append(self._generate_unique_section())
        
        # Tech Stack
        readme_content.append(self._generate_tech_stack())
        
        # GitHub Stats
        readme_content.append(self._generate_github_stats())
        
        # Currently
        readme_content.append(self._generate_currently_section())
        
        # Pinned Projects (placeholder)
        readme_content.append(self._generate_pinned_projects())
        
        # Custom Sections
        readme_content.append(self._generate_custom_sections())
        
        # Tools Daily
        readme_content.append(self._generate_tools_daily())
        
        # Connect With Me
        readme_content.append(self._generate_connect_section())
        
        # Sponsor Section
        readme_content.append(self._generate_sponsor_section())
        
        # Call to Action
        readme_content.append(self._generate_call_to_action())
        
        return "\n\n".join(readme_content)
    
    def _generate_hero_section(self) -> str:
        """Generate hero section with welcome banner"""
        name = self.config.get("basic_info", {}).get("name", "Developer")
        tagline = self.config.get("basic_info", {}).get("tagline", "Code. Create. Contribute. 🚀")
        
        hero = f"""<h1 align="center">👋 Hi there, I'm {name}!</h1>

<p align="center">
  <strong>{tagline}</strong>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=22&pause=1000&color=F7931E&center=true&vCenter=true&width=435&lines=Full+Stack+Developer;Open+Source+Enthusiast;Problem+Solver;Community+Builder" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username={self.config.get('basic_info', {}).get('github_username', 'username')}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile views" />
</p>"""
        
        return hero
    
    def _generate_about_section(self) -> str:
        """Generate about me section"""
        about_lines = self.config.get("about_me", {}).get("description", [])
        quotes = self.config.get("about_me", {}).get("quotes", [])
        
        section = "## 🧠 About Me\n\n"
        
        for line in about_lines:
            if line.strip():
                section += f"- {line}\n"
        
        section += "\n"
        
        for quote in quotes:
            if quote.strip():
                section += f"> \"{quote}\"\n\n"
        
        return section
    
    def _generate_unique_section(self) -> str:
        """Generate what sets me apart section"""
        return """## 🚀 What Sets Me Apart

- 🎨 **Design-focused development** - Creating beautiful, accessible user interfaces
- 📚 **Documentation enthusiast** - Writing developer-friendly docs that actually help
- 🤖 **Automation advocate** - Building scripts and workflows that save time
- 🌱 **Community contributor** - Believing in clean code and open-source collaboration
- 🔍 **Problem solver** - Finding elegant solutions to complex challenges"""
    
    def _generate_tech_stack(self) -> str:
        """Generate tech stack section with badges"""
        tech = self.config.get("tech_stack", {})
        
        section = "## 🛠️ Tech Stack\n\n"
        
        categories = [
            ("🧑‍💻 **Languages**", tech.get("languages", []), "languages"),
            ("🧱 **Frameworks**", tech.get("frameworks", []), "frameworks"),
            ("☁️ **Cloud & DevOps**", tech.get("cloud_devops", []), "cloud_devops"),
            ("🛠️ **Tools & Editors**", tech.get("tools_editors", []), "tools_editors")
        ]
        
        for title, items, category in categories:
            if items and any(item.strip() for item in items):
                section += f"{title}\n\n"
                badges = self.generate_badges(items, category)
                section += f"{badges}\n\n"
        
        return section
    
    def _generate_github_stats(self) -> str:
        """Generate GitHub stats section"""
        username = self.config.get("basic_info", {}).get("github_username", "username")
        
        return f"""## 📊 GitHub Stats & Visuals

<div align="center">
  
![GitHub Stats](https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true)

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user={username}&theme=tokyonight&hide_border=true)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=tokyonight&hide_border=true)

![GitHub Trophies](https://github-profile-trophy.vercel.app/?username={username}&theme=tokyonight&no-frame=true&margin-w=15)

![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=tokyo-night&hide_border=true)

</div>"""
    
    def _generate_currently_section(self) -> str:
        """Generate currently working section"""
        currently = self.config.get("currently", {})
        
        section = "## 📚 Currently...\n\n"
        
        items = [
            ("🔭 I'm currently working on", currently.get("working_on", "")),
            ("🌱 I'm currently learning", currently.get("learning", "")),
            ("👯 I'm looking to collaborate on", currently.get("collaborating", "")),
            ("🧠 I'm currently exploring", currently.get("exploring", "")),
            ("📫 How to reach me", currently.get("reach_me", ""))
        ]
        
        for label, value in items:
            if value and value.strip():
                section += f"- {label}: **{value}**\n"
        
        return section
    
    def _generate_pinned_projects(self) -> str:
        """Generate pinned projects section (placeholder)"""
        return """## 📁 Featured Projects

<div align="center">

| Project | Description | Tech Stack | Links |
|---------|-------------|------------|-------|
| 🚀 **Project 1** | Amazing project description | `React` `Node.js` `MongoDB` | [Live Demo](#) • [Repo](#) |
| 🎨 **Project 2** | Creative solution for developers | `Python` `Django` `PostgreSQL` | [Live Demo](#) • [Repo](#) |
| 🤖 **Project 3** | AI-powered development tool | `TypeScript` `Next.js` `OpenAI` | [Live Demo](#) • [Repo](#) |

</div>

> 📌 **Want to see more?** Check out my [repositories](https://github.com/username?tab=repositories) for the complete collection!"""
    
    def _generate_custom_sections(self) -> str:
        """Generate unique custom sections"""
        return """## 🎨 Unique Sections

### 🧭 My Coding Principles
> "Write once. Refactor twice. Document always."  
> "Code for humans, optimize for machines."  
> "Test early, test often, test everything."

### 🗓️ Weekly Dev Schedule
- 🧘 **Monday**: Documentation & Planning
- 🎥 **Tuesday**: Content Creation & Learning  
- 🚀 **Wednesday**: Open Source Contributions
- 🌐 **Thursday**: Live Building & Streaming
- 🔬 **Friday**: Experimentation & Research

### 🧬 Dev Milestones
```
2021 → Started my coding journey with JavaScript
2022 → Created my first open-source project  
2023 → Built an AI-powered development tool
2024 → Reached 1000+ GitHub contributions
2025 → Goal: Speak at major tech conferences
```

<details>
<summary>✨ Fun Facts About Me</summary>

- 🎮 I built my first game at age 12
- ⌨️ I collect vintage mechanical keyboards  
- 🌍 I've contributed to projects in 5+ languages
- ☕ I can't code without coffee (seriously!)
- 🎵 I code to lo-fi hip hop exclusively
- 🏃‍♂️ I debug best while walking

</details>

### 💡 Dev Tips I Live By
- **"First solve the problem, then write the code"** - John Johnson
- **"Clean code always looks like it was written by someone who cares"** - Robert C. Martin
- **"Programs must be written for people to read"** - Harold Abelson

### 📈 Goals for 2025
- [ ] 🚀 Release 3 major open-source projects
- [ ] 🎤 Speak at 2 tech conferences  
- [ ] 🧑‍🎓 Mentor 10 new developers
- [ ] 📚 Write 50 technical blog posts
- [ ] 🌟 Reach 5000 GitHub stars across projects

### 🔐 Security & Best Practices Checklist
- [x] Always use environment variables for secrets
- [x] Validate and sanitize all user inputs
- [x] Implement proper error handling
- [x] Use HTTPS everywhere
- [x] Regular dependency updates
- [x] Code reviews for every change"""
    
    def _generate_tools_daily(self) -> str:
        """Generate daily tools section"""
        return """## 🧰 Tools I Use Daily

<div align="center">

### 💻 Development Environment
![VSCode](https://img.shields.io/badge/-VSCode-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)
![Vim](https://img.shields.io/badge/-Vim-019733?style=flat-square&logo=vim&logoColor=white)
![Terminal](https://img.shields.io/badge/-Terminal-000000?style=flat-square&logo=terminal&logoColor=white)

### 🌐 Browsers & Testing
![Firefox](https://img.shields.io/badge/-Firefox-FF7139?style=flat-square&logo=firefox&logoColor=white)
![Chrome](https://img.shields.io/badge/-Chrome-4285F4?style=flat-square&logo=google-chrome&logoColor=white)
![Postman](https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)

### 🖥️ Operating Systems
![Linux](https://img.shields.io/badge/-Linux-FCC624?style=flat-square&logo=linux&logoColor=black)
![macOS](https://img.shields.io/badge/-macOS-000000?style=flat-square&logo=apple&logoColor=white)
![Windows](https://img.shields.io/badge/-Windows-0078D6?style=flat-square&logo=windows&logoColor=white)

</div>"""
    
    def _generate_connect_section(self) -> str:
        """Generate connect with me section"""
        social = self.config.get("social_links", {})
        username = self.config.get("basic_info", {}).get("github_username", "username")
        
        section = "## 📬 Connect With Me\n\n<div align=\"center\">\n\n"
        
        # Generate social badges
        links = []
        if social.get("portfolio"):
            links.append(f"[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=about.me&logoColor=white)]({social['portfolio']})")
        
        if social.get("email"):
            links.append(f"[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:{social['email']})")
        
        if social.get("linkedin"):
            links.append(f"[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]({social['linkedin']})")
        
        if social.get("twitter"):
            links.append(f"[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)]({social['twitter']})")
        
        if social.get("blog"):
            links.append(f"[![Blog](https://img.shields.io/badge/Blog-FF5722?style=for-the-badge&logo=blogger&logoColor=white)]({social['blog']})")
        
        if social.get("buymeacoffee"):
            links.append(f"[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)]({social['buymeacoffee']})")
        
        # Add GitHub profile link
        links.append(f"[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/{username})")
        
        section += "\n".join(links)
        section += "\n\n</div>"
        
        return section
    
    def _generate_sponsor_section(self) -> str:
        """Generate sponsor section"""
        buymeacoffee = self.config.get("social_links", {}).get("buymeacoffee")
        
        section = """## 🎁 Support My Work

<div align="center">

> ❤️ **Love my work?** Your support helps me create more amazing projects!

"""
        
        if buymeacoffee:
            section += f"[![Buy Me A Coffee](https://img.shields.io/badge/☕%20Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)]({buymeacoffee})\n"
        
        section += """[![GitHub Sponsors](https://img.shields.io/badge/💖%20Sponsor%20on%20GitHub-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/username)

</div>"""
        
        return section
    
    def _generate_call_to_action(self) -> str:
        """Generate call to action section"""
        username = self.config.get("basic_info", {}).get("github_username", "username")
        
        return f"""## 📌 Let's Build Something Amazing Together!

<div align="center">

### 🌟 **Star my repositories** if you find them useful!
### 👨‍💻 **Open to collaborations** on exciting projects
### 🔔 **Follow my GitHub** for the latest updates
### 💬 **Reach out** - I love connecting with fellow developers!

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" alt="Snake animation" />
</p>

*⭐ From [{username}](https://github.com/{username}) with ❤️*

</div>"""
    
    def save_readme(self, content: str, filename: str = "README.md"):
        """Save the generated README content to file"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ README generated successfully: {filename}")
    
    def run(self, config_file: str = "config.json"):
        """Main execution method"""
        print("🚀 Starting GitHub Profile README Generator...")
        
        # Load configuration
        self.load_config(config_file)
        
        # Generate README
        readme_content = self.generate_readme()
        
        # Save README
        self.save_readme(readme_content)
        
        print("\n🎉 Your stunning GitHub Profile README is ready!")
        print("📁 File saved as: README.md")
        print("🔗 Copy the content to your GitHub profile repository!")


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description="Generate stunning GitHub Profile READMEs")
    parser.add_argument("--config", "-c", default="config.json", 
                       help="Configuration file path (default: config.json)")
    parser.add_argument("--interactive", "-i", action="store_true",
                       help="Force interactive configuration setup")
    
    args = parser.parse_args()
    
    generator = GitHubReadmeGenerator()
    
    if args.interactive or not os.path.exists(args.config):
        generator.create_interactive_config()
    
    generator.run(args.config)


if __name__ == "__main__":
    main() 