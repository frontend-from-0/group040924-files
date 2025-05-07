export const TailwindExample = () => {
  return (
    <Card>
      <Heading1>This is a Tailwind CSS Example component</Heading1>
      <Body2 color="primary">
        This is for utility-first fans. You apply pre-defined classes directly
        in your JSX. It's like having a huge set of utility classes at your
        disposal for almost every CSS property.
      </Body2>
    </Card>
  );
};

export const TailwindExample2 = () => {
  return (
    <div className="text-center rounded bg-neutral-200 max-w-lg mx-auto p-5">
      <h1 className="text-orange-400">This is a Tailwind CSS Example component</h1>
      <p className="text-sm text-gray-500">
        This is for utility-first fans. You apply pre-defined classes directly
        in your JSX. It's like having a huge set of utility classes at your
        disposal for almost every CSS property.
      </p>
    </div>
  );
};

export const Card = ({ children }) => {
  return (
    <div className="text-center rounded bg-neutral-200 max-w-lg mx-auto p-5">
      {children}
    </div>
  );
};

export const Heading1 = ({ children }) => {
  return <h1 className="text-orange-400">{children}</h1>;
};

export const Body1 = ({ children }) => {
  return <p className="text-lg">{children}</p>;
};

export const Body2 = ({ color, children }) => {
  const colorClass = () => {
    switch (color) {
      case "primary":
        return "text-blue-500";
      case "secondary":
        return "text-gray-500";
        default:
          return '';
    }
  };
  return <p className={`text-sm ${colorClass()}`}>{children}</p>;
};
