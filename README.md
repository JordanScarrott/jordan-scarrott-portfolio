# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## WaveBackground Component

The `WaveBackground` component creates an interactive, animated background. It supports two different simulation modes: a grid-based wave and a particle-based fluid simulation.

### Usage

Import the component and place it in your app (usually at the root or as a background wrapper).

```jsx
import WaveBackground from './components/ui/WaveBackground/WaveBackground';
```

### Variants

You can switch between simulation modes using the `variant` prop.

#### 1. Grid Mode (Default)
The classic grid wave effect with connected nodes.

```jsx
<WaveBackground variant="grid" />
```

#### 2. Fluid Mode
A free-particle simulation where nodes float freely and connect when close.

```jsx
<WaveBackground variant="fluid" />
```

### Advanced Configuration

You can pass custom behaviors (interactions or effects) and simulation configuration.

**Fluid Mode with Custom Interactions:**

The fluid mode comes with `CursorObstruction` and `ClickSplash` by default. You can customize them or add more.

```jsx
import WaveBackground from './components/ui/WaveBackground/WaveBackground';
import { CursorObstruction, ClickSplash } from './components/ui/WaveBackground/simulations';

function App() {
  return (
    <WaveBackground
      variant="fluid"
      behaviors={[
        new CursorObstruction(150, 0.8), // Custom radius and strength
        new ClickSplash(300, 8)
      ]}
      simulationConfig={{
        particleCount: 500,
        baseColor: "rgba(100, 200, 255, 0.5)"
      }}
    />
  );
}
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
