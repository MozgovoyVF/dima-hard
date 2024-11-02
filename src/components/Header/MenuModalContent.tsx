"use client";

import * as React from "react";
import { useSwipeMenu } from "@/hooks/useSwipeMenu";
import ClientOnlyPortal from "../ClientOnlyPortal/ClientOnlyPortal";
import { MenuModal } from "../MenuModal/MenuModal";
import { Squash as Hamburger } from "hamburger-react";
import { useProfile } from "@/hooks/useProfile";

export function MenuModalContent() {
  const { data } = useProfile();
  const { isShowModal, setIsShowModal } = useSwipeMenu();

  return (
    <>
      <ClientOnlyPortal selector={"#modal"}>
        <MenuModal
          closeFn={() => setIsShowModal(false)}
          subscribe={data?.profile.subscribe || false}
          tasks={data?.task}
          role={data?.role}
          isShowModal={isShowModal}
        />
      </ClientOnlyPortal>
      <span onTouchEnd={(e) => e.stopPropagation()}>
        <Hamburger toggled={isShowModal} toggle={() => setIsShowModal((prev) => !prev)} size={20} />
      </span>
    </>
  );
}
