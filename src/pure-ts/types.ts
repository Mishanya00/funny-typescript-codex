export type PageDefinition = {
  id: string;
  title: string;
  description: string;
  render: (props: PageRenderProps) => HTMLElement;
};

export type PageRenderProps = {
  onBack: () => void;
};
