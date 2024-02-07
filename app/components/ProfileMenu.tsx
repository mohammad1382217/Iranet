import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  selectIsMenuOpen,
  useSelector,
  appSlice,
  useDispatch,
} from "../../lib/redux";
import { profileMenuItems } from "../../data/profileMenuItems";
import { useNavigate } from "react-router-dom";

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  titleProfile,
  avatarSrc,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuOpen = useSelector(selectIsMenuOpen);

  return (
    <div className="z-50">
      <Menu
        open={isMenuOpen}
        handler={() => dispatch(appSlice.actions.setIsMenuOpen())}
        placement="bottom-end"
      >
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center justify-center rounded-full py-0.5 pr-1 pl-0.5 "
          >
            <div className="flex items-center justify-center">
              <div className="ml-3 pr-4 sm:!ml-1 md:ml-2 md:hidden">
                {titleProfile}
              </div>
              <Avatar
                className="!w-10 !h-10 m-1"
                src={avatarSrc}
                alt="avatar"
              />
            </div>
          </Button>
        </MenuHandler>
        <MenuList className="p-1 sm:min-w-[32px]">
          {profileMenuItems.map((item, key: number) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={item.lable}
                onClick={() => navigate(item.link)}
                className={`flex justify-center text-center text-sm font-medium items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {item.icon}
                <Typography
                  as="span"
                  variant="small"
                  className="text-center text-sm font-medium"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {item.lable}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

// Types
interface ProfileMenuProps {
  titleProfile: React.ReactNode;
  avatarSrc: string;
}
