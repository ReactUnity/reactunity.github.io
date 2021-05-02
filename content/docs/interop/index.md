---
title: Communication between React and Unity
id: interop
order: 1
---

Although there are various ways to do this for advanced use cases, the recommended way is to use the `Globals` object for communication between React and Unity.
`Globals` is a dictionary of Unity objects you can send over to the React side from the Unity side. 

You can set `Globals` in the inspector:

![inspector](/images/docs/interop/inspector.png)

After assigning, you can access your object in React side via the `Globals` global variable. Here is an [example script](https://github.com/ReactUnity/full-sample/blob/main/react/src/showcase/index.tsx#L176) using `Globals`. You can download the [full sample project](https://github.com/ReactUnity/full-sample) to see this in action.

![example](/images/docs/interop/example.gif)

Note: You can set/get an object's public properties and call its public methods from React side. However, if you try to set/get a non-existing or non-public property/method, you will get an error.
