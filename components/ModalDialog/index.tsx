import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Modal, Backdrop } from "@material-ui/core";
import { css } from "emotion";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";

interface ModalDialog {
    showModal: any;
    onCloseModal: any;
    children: any;
}

const ModalDialog: FC<ModalDialog> = ({
    showModal,
    onCloseModal,
    children,
}) => {
    const { t } = useTranslation();
    const route = useRouter();

    return (
        <Modal
            className={style.pokemonListModal}
            open={showModal}
            onClose={onCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            {children}
        </Modal>
    );
};

const style = {
    pokemonListModal: css`
        display: flex !important;
        flex-direction: column;
        justify-content: center !important;
        align-items: center !important;
    `,
};

export default ModalDialog;
