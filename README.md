# Scaffolder

## Supported stacks

For now i will assume that all projects use react, vite and typescript, so I'll outline only the differences between them

- esbuild
- swc

## Ideas

- check [this](https://github.com/vitejs/awesome-vite?tab=readme-ov-file#react) github repo for resources - which ones actually work. I should decide what to do with the ones that work - should I link them here or something else - not sure yet!

- all possible vite combinations from their website
- docusaurus
- hono?
- tanstack stuff
- react-hook-form
- mui
- mantine
- ant design
- zustand
- redux
- graphql stuff
- astro?

## Why

I've always wanted to try different libraries and integrations between them, but the initial setup takes a lot of time (even with AI) which is kinda losing the point for me. For example, I may want to have vite + react + typescript + daisyui + react-query + zustand front end and nestjs backend with prisma. To setup all that it will take a lot of time. The fact that i need to explain all of that the AI and then validate manually if it is working. I prefer to have stuff that i know works and then have a script that i can use with buttons as a starting point.  
Additionally, having a dashboard to see all possible scaffolds provides ideas for what is possible.

## Vision

Scaffolder is a web application that allows developers to visually configure and generate project setups without memorizing complex CLI commands. The tool focuses on streamlining the initial project setup process by providing an intuitive UI for selecting technologies and generating shell scripts that handle the complete setup.

## Core Features

- **Visual Technology Selection**: Choose your preferred frontend framework, build tools, styling libraries, and more through an intuitive interface
- **Compatible Combinations**: Only show technology combinations that work well together
- **Shell Script Generation**: Create downloadable shell scripts that set up your entire development environment
- **Cross-Platform Support**: Generate scripts compatible with macOS, Linux, and Windows environments
- **Popular Framework Support**: Initial focus on React, Vue, Angular with TypeScript/JavaScript options
- **UI Library Integration**: Built-in support for popular UI libraries like DaisyUI, Tailwind, Material UI, etc.

## How It Works

1. Visit the web application
2. Select your desired technologies, frameworks, and configurations
3. Download a custom shell script
4. Run the script in your terminal to set up your project

## Benefits

- **Eliminate Configuration Friction**: No more searching for the right command flags or setup steps
- **Consistent Project Structure**: Start with a well-organized folder structure from day one
- **Time Savings**: Reduce project setup time from hours to minutes
- **Best Practices Built-in**: Scripts follow recommended patterns and configurations
- **No Installation Required**: The tool is web-based; only the generated script needs to be executed

## Technical Implementation

The generator will be built as a client-side application that dynamically constructs shell scripts based on user selections. For each combination of technologies, we'll maintain tested scripts that ensure all selected components work together seamlessly.

## Future Possibilities

While the initial focus is on the core project generation, future enhancements could include:

- Saved configurations for teams
- Additional frameworks and libraries
- Template selection for common application types
- GitHub integration for direct repository creation

## Contributing

This project is in its planning phase. If you're interested in contributing or have suggestions, please open an issue or reach out to the maintainers.# Boilerplate Generator

## Vision

Boilerplate Generator is a web application that allows developers to visually configure and generate project setups without memorizing complex CLI commands. The tool focuses on streamlining the initial project setup process by providing an intuitive UI for selecting technologies and generating shell scripts that handle the complete setup.

## Core Features

- **Visual Technology Selection**: Choose your preferred frontend framework, build tools, styling libraries, and more through an intuitive interface
- **Compatible Combinations**: Only show technology combinations that work well together
- **Shell Script Generation**: Create downloadable shell scripts that set up your entire development environment
- **Cross-Platform Support**: Generate scripts compatible with macOS, Linux, and Windows environments
- **Popular Framework Support**: Initial focus on React, Vue, Angular with TypeScript/JavaScript options
- **UI Library Integration**: Built-in support for popular UI libraries like DaisyUI, Tailwind, Material UI, etc.

## How It Works

1. Visit the web application
2. Select your desired technologies, frameworks, and configurations
3. Download a custom shell script
4. Run the script in your terminal to set up your project

## Benefits

- **Eliminate Configuration Friction**: No more searching for the right command flags or setup steps
- **Consistent Project Structure**: Start with a well-organized folder structure from day one
- **Time Savings**: Reduce project setup time from hours to minutes
- **Best Practices Built-in**: Scripts follow recommended patterns and configurations
- **No Installation Required**: The tool is web-based; only the generated script needs to be executed

## Technical Implementation

The generator will be built as a client-side application that dynamically constructs shell scripts based on user selections. For each combination of technologies, we'll maintain tested scripts that ensure all selected components work together seamlessly.

## Future Possibilities

While the initial focus is on the core project generation, future enhancements could include:

- Saved configurations for teams
- Additional frameworks and libraries
- Template selection for common application types
- GitHub integration for direct repository creation

## Contributing

This project is in its planning phase. If you're interested in contributing or have suggestions, please open an issue or reach out to the maintainers.
