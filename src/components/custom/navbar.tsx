import React, { ReactElement } from "react";
import { Logo } from "./logo";
import { ModeToggle } from "../theme-toggle";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarLabel,
} from "@/components/ui/menubar";
import Link from "next/link";

export const Navbar = (): ReactElement => {
  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Logo />
        </Link>

        <Menubar className="border-0 bg-inherit">
          <MenubarMenu>
            <MenubarTrigger>System</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Session</MenubarItem>
              <MenubarItem>New Retro</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Admin</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Phase</MenubarLabel>
              <MenubarRadioGroup value="writing">
                <MenubarRadioItem value="writing">Writing</MenubarRadioItem>
                <MenubarRadioItem value="voting">Voting</MenubarRadioItem>
                <MenubarRadioItem value="grouping">Grouping</MenubarRadioItem>
                <MenubarRadioItem value="actioning">Actioning</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarItem>End Retro</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <nav>
        {/* <Button variant="ghost">About</Button>
        <Button variant="ghost">Pricing</Button>
        <Button variant="ghost">Contact</Button> */}
        <ModeToggle />
      </nav>
    </header>
  );
};
