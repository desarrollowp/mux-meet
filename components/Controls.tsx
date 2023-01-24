import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Flex, useDisclosure } from "@chakra-ui/react";

import { useSpace } from "hooks/useSpace";

import ControlsRight from "./controls/ControlsRight";
import ControlsLeft from "./controls/ControlsLeft";
import ControlsCenter from "./controls/ControlsCenter";
import ACRScoreDialog from "./modals/ACRScoreDialog";

interface Props {
  renameCallback: (newName: string) => void;
}

export default function Controls({ renameCallback }: Props): JSX.Element {
  const router = useRouter();
  const { space } = useSpace();
  const { isOpen: isACRScoreDialogOpen, onOpen: onACRScoreDialogOpen } =
    useDisclosure();

  const leaveSpacePage = useCallback(() => {
    router.push("/");
  }, [router]);

  const promptForACR = useCallback(() => {
    if (space) {
      space.leave();
      onACRScoreDialogOpen();
    } else {
      leaveSpacePage();
    }
  }, [space, leaveSpacePage, onACRScoreDialogOpen]);

  return (
    <>
      <ACRScoreDialog isOpen={isACRScoreDialogOpen} onClose={leaveSpacePage} />
      <Flex
        alignItems="center"
        backgroundColor="#383838"
        bottom="0px"
        flexDirection="row"
        height={{ base: "60px", sm: "80px" }}
        justifyContent="space-between"
        left="0px"
        padding="10px 40px"
        position="fixed"
        width="100%"
        zIndex={1000}
      >
        <ControlsLeft />
        <ControlsCenter onLeave={promptForACR} onRename={renameCallback} />
        <ControlsRight onLeave={promptForACR} />
      </Flex>
    </>
  );
}
