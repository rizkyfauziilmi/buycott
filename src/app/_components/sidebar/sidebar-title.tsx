interface SidebarTitleProps {
  title: string;
}

export const SidebarTitle = ({ title }: SidebarTitleProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-lg bg-muted-foreground"></div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
    </div>
  );
};
