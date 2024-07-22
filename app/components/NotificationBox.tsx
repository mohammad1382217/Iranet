const NotificationBox: React.FC<NotificationBoxProps> = ({
  NotificatonBoxClass,
  children,
}) => {
  return (
    <div
      className={`w-1/4 sticky left-0 top-16 bottom-0 h-[calc(100vh-4rem)] overflow-y-auto xl-max:hidden bg-gray-50 p-6 flex flex-col flex-shrink-0 ${NotificatonBoxClass}`}
    >
      {children}
    </div>
  );
};

export default NotificationBox;

// Types
interface NotificationBoxProps {
  NotificatonBoxClass?: string;
  children: React.ReactNode;
}