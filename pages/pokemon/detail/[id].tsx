import React, { FC, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Chip, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import LangSelector from "components/LangSelector";
import Header from "components/Header";
import setLanguage from "next-translate/setLanguage";
import axios from "axios";
import {
    getBackgroundColorBadge,
    getFormattedPokemonName,
    getStatsColor,
} from "@utils/string";
import { css } from "emotion";
import Head from "next/head";

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const route = useRouter();
    const { locale, query } = route;

    const [pokemonDetailData, setPokemonDetailData] = useState(null);

    useEffect(() => {
        if (query.id) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${query.id}`)
                .then(async (res) => {
                    if (res.status === 200) {
                        setPokemonDetailData(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [query.id]);

    console.log(pokemonDetailData);

    const handleChange = async (value: string) => {
        await setLanguage(value);
    };

    return (
        <>
            <Head>
                <title>Pokemon - Detail</title>
            </Head>

            {/* Lang Selector */}
            <LangSelector locale={locale} handleChange={handleChange} />

            {/* Header */}
            <Header active="header" />

            {/* Content */}
            <Container maxWidth="lg">
                <div className={style.pokemonDetailBodyContent}>
                    <div className="wi-40">
                        <img
                            src={
                                pokemonDetailData?.sprites?.other?.[
                                    "official-artwork"
                                ]?.front_default
                            }
                            width="80%"
                        />
                    </div>

                    <div className="d-grid align-items-c wi-60">
                        <div>
                            <div className="margin-b-46">
                                <span className={style.pokemonDetailName}>
                                    {getFormattedPokemonName(
                                        pokemonDetailData?.name,
                                    )}
                                </span>
                            </div>

                            <div className="d-flex margin-b-20">
                                <div
                                    className={`wi-50 ${style.colorBasicNeutral500}`}
                                >
                                    <span className="fs-20 fw-700">
                                        {`${t("common:detail-1")} : `}
                                    </span>

                                    <span className="fs-20 fw-400">
                                        {pokemonDetailData?.weight} hg
                                    </span>
                                </div>

                                <div
                                    className={`wi-50 ${style.colorBasicNeutral500}`}
                                >
                                    <span className="fs-20 fw-700">
                                        {`${t("common:detail-2")} : `}
                                    </span>

                                    <span className="fs-20 fw-400">
                                        {pokemonDetailData?.height} dm
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex margin-b-20">
                                <div
                                    className={`d-flex ${style.colorBasicNeutral500}`}
                                >
                                    <span className="fs-20 fw-700 margin-r-20">
                                        {`${t("common:detail-3")} : `}
                                    </span>

                                    <div className="d-flex flex-column">
                                        {pokemonDetailData?.abilities?.length &&
                                            pokemonDetailData.abilities.map(
                                                (data: any, index: number) => (
                                                    <span
                                                        className="fs-20 fw-400"
                                                        key={index}
                                                    >
                                                        -{" "}
                                                        {getFormattedPokemonName(
                                                            data.ability?.name,
                                                        )}{" "}
                                                        {data.is_hidden
                                                            ? "(hidden)"
                                                            : ""}
                                                    </span>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div
                                    className={`d-flex align-items-c ${style.colorBasicNeutral500}`}
                                >
                                    <span className="fs-20 fw-700">
                                        {`${t("common:detail-4")} : `}
                                    </span>

                                    {pokemonDetailData?.types?.length &&
                                        pokemonDetailData.types.map(
                                            (data: any, index: number) => (
                                                <Chip
                                                    className={`margin-l-20 ${style.pokemonDetailCardBadge}`}
                                                    style={{
                                                        backgroundColor: `${getBackgroundColorBadge(
                                                            data?.type?.name,
                                                        )}`,
                                                    }}
                                                    variant="default"
                                                    size="medium"
                                                    label={getFormattedPokemonName(
                                                        data?.type?.name,
                                                    )}
                                                    key={index}
                                                />
                                            ),
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="margin-b-46">
                    <div>
                        <span className={style.sectionTitle}>
                            {`${t("common:other-images")} : `}
                        </span>
                    </div>

                    <div className="d-flex">
                        <Grid container alignItems="center" spacing={2}>
                            {pokemonDetailData?.sprites?.front_default && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites
                                                .front_default
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}

                            {pokemonDetailData?.sprites?.back_default && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites
                                                .back_default
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}

                            {pokemonDetailData?.sprites?.front_female && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites
                                                .front_female
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}

                            {pokemonDetailData?.sprites?.back_female && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites
                                                .back_female
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}

                            {pokemonDetailData?.sprites?.front_shiny && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites
                                                .front_shiny
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}

                            {pokemonDetailData?.sprites?.back_shiny && (
                                <Grid item lg={2}>
                                    <img
                                        src={
                                            pokemonDetailData.sprites.back_shiny
                                        }
                                        width="100%"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </div>

                <div className="margin-b-46">
                    <div className="margin-b-16">
                        <span className={style.sectionTitle}>{`${t(
                            "common:stats",
                        )} : `}</span>
                    </div>

                    <div className="d-flex">
                        <Grid container alignItems="center" spacing={2}>
                            {pokemonDetailData?.stats?.length &&
                                pokemonDetailData.stats.map(
                                    (data: any, index: number) => (
                                        <Grid
                                            item
                                            lg={2}
                                            key={index}
                                            className="d-flex justify-content-c align-items-c"
                                        >
                                            <Box
                                                component="div"
                                                className={style.statsCircle}
                                                style={{
                                                    color: `${getStatsColor(
                                                        index,
                                                    )}`,
                                                }}
                                            >
                                                <span className="fs-24 fw-700 text-align-c">
                                                    {data.base_stat}
                                                </span>
                                                <span className="fs-20 fw-700 text-align-c">
                                                    {getFormattedPokemonName(
                                                        data.stat.name,
                                                    )}
                                                </span>
                                            </Box>
                                        </Grid>
                                    ),
                                )}
                        </Grid>
                    </div>
                </div>
            </Container>
        </>
    );
};

const style = {
    pokemonDetailName: css`
        font-size: 40px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-500) !important;
    `,
    pokemonDetailCardBadge: css`
        font-size: 20px !important;
        height: 32px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-100) !important;
    `,
    pokemonDetailBodyContent: css`
        margin-top: 60px;
        display: flex;
    `,
    colorBasicNeutral500: css`
        color: var(--basic-neutral-500) !important;
    `,
    sectionTitle: css`
        color: var(--basic-neutral-500) !important;
        font-size: 20px !important;
        font-weight: 700 !important;
    `,
    statsCircle: css`
        display: flex;
        flex-direction: column;
        width: 120px !important;
        height: 120px !important;
        border: 25px solid;
        border-radius: 100px;
        justify-content: center;
        align-items: center;
    `,
};

export default DetailPokemon;
