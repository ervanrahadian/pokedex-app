import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Grid } from "@material-ui/core";
import { css } from "emotion";
import { PokemonIcon } from "@components/icons";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";

interface Header {
    active: string;
}

const Header: FC<Header> = ({ active }) => {
    const { t } = useTranslation();
    const route = useRouter();

    return (
        <Container maxWidth="lg">
            <Box component="div" className={style.header}>
                <Grid container alignItems="center" spacing={5}>
                    <Grid item>
                        <PokemonIcon />
                    </Grid>

                    <Grid item>
                        <span
                            className={`${style.headerMenuFont} ${
                                active === "header"
                                    ? style.enabled
                                    : style.disabled
                            }`}
                            onClick={() => route.push(ROUTES_PATH.pokemon_list)}
                        >
                            {t("common:menu-1")}
                        </span>
                    </Grid>

                    <Grid item>
                        <span
                            className={`${style.headerMenuFont} ${
                                active === "pokemonType"
                                    ? style.enabled
                                    : style.disabled
                            }`}
                            // onClick={() => route.push(ROUTES_PATH.pokemon_type)}
                        >
                            {t("common:menu-2")}
                        </span>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

const style = {
    header: css`
        display: flex !important;
        align-items: center !important;
    `,
    headerMenuFont: css`
        font-size: 16px !important;
        cursor: pointer !important;
    `,
    enabled: css`
        font-weight: 700 !important;
        color: var(--secondary-yellow-600) !important;
    `,
    disabled: css`
        font-weight: 400 !important;
        color: var(--basic-neutral-500) !important;
    `,
};

export default Header;
