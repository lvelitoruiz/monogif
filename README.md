# MonoRepo with Lerna / Storybook / Stencil / React

As we're gonna use **Lerna** we need to install it globally:
```
npm  install  --global lerna
```
```
make sure we're using node version v19.8.1 for all the installations and runs
```

Inside the project on the root folder we need to run the install of NPM:

```
npm install
```
We need to run this command as well on the next folders:

```
packages/gif-gallery

packages/stencil-library

packages/react-library
```

When this is done you only need to run the next commands:

on **packages/stencil-library** we need to build the components, so:

```
 npm run build
 ```
The same on **packages/react-library**

```
 npm run build
 ```

and finally on **packages/gif-gallery**

```
 npm run start
 ```


# Description of project

The project is a **monorepo**, where we're using **stenciljs** to create components that coudl be reused on other projects those could be **angular** or **react** or maybe **vue** and **svelte**, we are using **storybook** to show the components (Basically because of time), you can check the storybook by going to the **packages/stencil-library** and running:

```
npm run storybook
```

The project allows you to search for **gifs** at the same time, clicking on any of them would allow you to convert that one (Or remove) to a **favorite** that would be save on the **local storage** and read upon initializing the app. furthermore we added a **History** list with the last six searches.

At the same time, using **tailwind css** it was made a **theme switcher** to change between **dark** and **light**. 

It have a **pagination** component, and when searching you can check that it uses a **loader** to show you what is doing, but maybe you wouldn't be able to see it so much because the search was optimized to be as fast as possible.

# Note

Because I was worried to end this asap I didn't remove the **API key** from the code, but I don't mind having that on the code right now. 