import React, { FC, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Chip,
} from "@material-ui/core";
import { css } from "emotion";
import { PokemonJumbotronIcon } from "@components/icons";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import Header from "components/Header";
import LangSelector from "components/LangSelector";
import axios from "axios";
import queryString from "query-string";
import {
    getBackgroundColorBadge,
    getFormattedPokemonName,
} from "@utils/string";
import { Pagination } from "@material-ui/lab";
import ModalDialog from "components/ModalDialog";
import Head from "next/head";

const PokemonList: FC = () => {
    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;

    const [pagination, setPagination] = useState({
        limit: 9,
        offset: 0,
        page: 1,
        totalData: 0,
        totalPage: 0,
    });
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonDetailData, setPokemonDetailData] = useState([]);
    const [selectedDetailData, setSelectedDetailData] = useState(null);
    const [showModalDetail, setShowModalDetail] = useState(false);

    useEffect(() => {
        let values = {
            limit: pagination.limit,
            offset: pagination.offset,
        };

        let query = queryString.stringify(values);

        axios
            .get(`https://pokeapi.co/api/v2/pokemon?${query}`)
            .then(async (res) => {
                if (res.status === 200) {
                    setPokemonDetailData([]);

                    await res.data.results.map((single: any) => {
                        if (single.url) {
                            axios
                                .get(single.url)
                                .then(async (resDetail) => {
                                    if (resDetail.status === 200) {
                                        let detailData = {
                                            id: resDetail.data.id,
                                            name: resDetail.data.name,
                                            image: resDetail.data.sprites
                                                ?.other?.["official-artwork"]
                                                ?.front_default,
                                            types: resDetail.data.types,
                                            weight: resDetail.data.weight,
                                            height: resDetail.data.height,
                                            abilities: resDetail.data.abilities,
                                        };

                                        setPokemonDetailData((prev) => {
                                            return [...prev, detailData];
                                        });
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    });

                    setPokemonData(res.data.results);
                    setPagination({
                        ...pagination,
                        totalData: res.data.count,
                        totalPage: Math.ceil(res.data.count / 9),
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pagination.offset]);

    const handleChange = async (value: string) => {
        await setLanguage(value);
    };

    const scrollToList = () => {
        document.getElementById("pokemon-list").scrollIntoView();
    };

    const handleShowModalDetail = (index: number) => {
        setSelectedDetailData(index);
        setShowModalDetail(true);
    };

    const handleCloseModalDetail = () => {
        setSelectedDetailData(null);
        setShowModalDetail(false);
    };

    const handleChangePagination = (event: any, page: number) => {
        if (page !== pagination.page) {
            setPagination({
                ...pagination,
                page: page,
                offset: page * 9 - 9,
            });
            setPokemonData([]);
            setPokemonDetailData([]);
        }
    };

    return (
        <>
            <Head>
                <title>Pokemon - List</title>
            </Head>

            {/* Lang Selector */}
            <LangSelector locale={locale} handleChange={handleChange} />

            {/* Header */}
            <Header active="header" />

            {/* Content */}
            <Container maxWidth="lg">
                <Box component="div" className={style.content}>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid
                            item
                            className={style.contentGridLeft}
                            xs={12}
                            md={6}
                        >
                            <Typography className={style.contentTitle}>
                                {t("pokemon_list:title")}
                            </Typography>

                            <Typography className={style.contentTitleV2}>
                                {t("pokemon_list:title-2")}
                            </Typography>

                            <Button
                                variant="contained"
                                className={style.contentButton}
                                onClick={scrollToList}
                            >
                                {t("pokemon_list:title-button")}
                            </Button>
                        </Grid>

                        <Grid
                            item
                            className={style.contentGridRight}
                            xs={12}
                            md={6}
                        >
                            <PokemonJumbotronIcon />
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Pokemon List */}
            <div className={style.pokemonListConteiner}>
                <Container maxWidth="lg">
                    <Box component="div" id="pokemon-list">
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    align="center"
                                    className={style.pokemonListTitle}
                                >
                                    PokèDex
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    align="center"
                                    className={style.pokemonListTitleV2}
                                >
                                    {`${t("pokemon_list:title-3")} ${
                                        pagination.totalData
                                    } Pokemon`}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems="center"
                            spacing={8}
                            className={style.content}
                        >
                            {pokemonData.map((_, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Box
                                        component="div"
                                        className={style.pokemonListCard}
                                        onClick={() =>
                                            handleShowModalDetail(index)
                                        }
                                    >
                                        <img
                                            src={
                                                pokemonDetailData[index]
                                                    ?.image || ""
                                            }
                                            width="100%"
                                            className={
                                                style.pokemonListCardImage
                                            }
                                        />

                                        <Typography
                                            className={style.pokemonListCardId}
                                        >
                                            {`#${
                                                pokemonDetailData[index]?.id <
                                                10
                                                    ? `00${pokemonDetailData[index]?.id}`
                                                    : pokemonDetailData[index]
                                                          ?.id < 100
                                                    ? `0${pokemonDetailData[index]?.id}`
                                                    : pokemonDetailData[index]
                                                          ?.id
                                            }`}
                                        </Typography>

                                        <Typography
                                            className={
                                                style.pokemonListCardName
                                            }
                                        >
                                            {getFormattedPokemonName(
                                                pokemonDetailData[index]?.name,
                                            )}
                                        </Typography>

                                        {pokemonDetailData[index]?.types
                                            ?.length &&
                                            pokemonDetailData[index].types.map(
                                                (data: any, index: number) => (
                                                    <Chip
                                                        className={`margin-t-10 margin-r-20 ${style.pokemonListCardBadge}`}
                                                        style={{
                                                            backgroundColor: `${getBackgroundColorBadge(
                                                                data?.type
                                                                    ?.name,
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
                                    </Box>
                                </Grid>
                            ))}

                            <Grid container alignItems="center" spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    className={style.pokemonListPagination}
                                >
                                    <Pagination
                                        count={pagination.totalPage}
                                        variant="outlined"
                                        shape="rounded"
                                        page={pagination.page}
                                        onChange={handleChangePagination}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>

            {/* Modal */}
            <ModalDialog
                showModal={showModalDetail}
                onCloseModal={handleCloseModalDetail}
            >
                <div className={style.pokemonListModalBody}>
                    <div
                        className={style.pokemonListModalBodyHeader}
                        onClick={handleCloseModalDetail}
                    >
                        <span>x</span>
                    </div>

                    <div className={style.pokemonListModalBodyContent}>
                        <div className="wi-40">
                            <img
                                src={
                                    pokemonDetailData[selectedDetailData]?.image
                                }
                                width="100%"
                            />
                        </div>

                        <div className="d-grid align-items-c wi-60 ">
                            <div>
                                <div className="margin-b-46">
                                    <span className={style.pokemonListCardName}>
                                        {getFormattedPokemonName(
                                            pokemonDetailData[
                                                selectedDetailData
                                            ]?.name,
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
                                            {
                                                pokemonDetailData[
                                                    selectedDetailData
                                                ]?.weight
                                            }{" "}
                                            hg
                                        </span>
                                    </div>

                                    <div
                                        className={`wi-50 ${style.colorBasicNeutral500}`}
                                    >
                                        <span className="fs-20 fw-700">
                                            {`${t("common:detail-2")} : `}
                                        </span>

                                        <span className="fs-20 fw-400">
                                            {
                                                pokemonDetailData[
                                                    selectedDetailData
                                                ]?.height
                                            }{" "}
                                            dm
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
                                            {pokemonDetailData[
                                                selectedDetailData
                                            ]?.abilities?.length &&
                                                pokemonDetailData[
                                                    selectedDetailData
                                                ].abilities.map(
                                                    (
                                                        data: any,
                                                        index: number,
                                                    ) => (
                                                        <span
                                                            className="fs-20 fw-400"
                                                            key={index}
                                                        >
                                                            -{" "}
                                                            {getFormattedPokemonName(
                                                                data.ability
                                                                    ?.name,
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

                                <div className="d-flex margin-b-56">
                                    <div
                                        className={`d-flex align-items-c ${style.colorBasicNeutral500}`}
                                    >
                                        <span className="fs-20 fw-700">
                                            {`${t("common:detail-4")} : `}
                                        </span>

                                        {pokemonDetailData[selectedDetailData]
                                            ?.types?.length &&
                                            pokemonDetailData[
                                                selectedDetailData
                                            ].types.map(
                                                (data: any, index: number) => (
                                                    <Chip
                                                        className={`margin-l-20 ${style.pokemonListCardBadge}`}
                                                        style={{
                                                            backgroundColor: `${getBackgroundColorBadge(
                                                                data?.type
                                                                    ?.name,
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

                                <div>
                                    <Button
                                        variant="contained"
                                        className={style.contentButton}
                                        onClick={() =>
                                            route.push(
                                                `${ROUTES_PATH.pokemon_detail}/${pokemonDetailData[selectedDetailData]?.id}`,
                                            )
                                        }
                                    >
                                        {t("common:more-detail")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </>
    );
};

const style = {
    content: css`
        display: flex !important;
        min-height: calc(100vh - 120px) !important;
        padding: 20px !important;
    `,
    contentGridLeft: css`
        display: flex !important;
        flex-direction: column !important;
    `,
    contentGridRight: css`
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    `,
    contentTitle: css`
        font-size: 52px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-500) !important;
    `,
    contentTitleV2: css`
        font-size: 20px !important;
        font-weight: 400 !important;
        color: var(--basic-neutral-400) !important;
        margin: 16px 0px 32px 0px !important;
    `,
    contentButton: css`
        background: var(--secondary-yellow-600) !important;
        color: var(--basic-neutral-100) !important;
        font-size: 20px !important;
        font-weight: 700 !important;
        max-width: 240px !important;
        border-radius: 14px !important;
        text-transform: capitalize !important;
    `,
    pokemonListConteiner: css`
        background: var(--secondary-yellow-500) !important;
    `,
    pokemonListTitle: css`
        font-size: 40px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-500) !important;
        margin-top: 80px !important;
        margin-bottom: 16px !important;
    `,
    pokemonListTitleV2: css`
        font-size: 24px !important;
        font-weight: 400 !important;
        color: var(--basic-neutral-500) !important;
        margin-bottom: 58px !important;
    `,
    pokemonListCard: css`
        background: var(--basic-neutral-100) !important;
        min-height: 550px !important;
        border-radius: 24px !important;
        box-shadow: 5px 10px 25px rgba(0, 0, 0, 0.35) !important;
        cursor: pointer !important;
        transition: 0.5s all !important;
        padding: 10px 25px !important;
        &:hover {
            box-shadow: none !important;
        }
    `,
    pokemonListCardImage: css`
        min-height: 304px !important;
    `,
    pokemonListCardId: css`
        font-size: 20px !important;
        font-weight: 700 !important;
        margin: 10px 0 !important;
        color: var(--basic-neutral-300) !important;
    `,
    pokemonListCardName: css`
        font-size: 40px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-500) !important;
    `,
    pokemonListCardBadge: css`
        font-size: 20px !important;
        height: 32px !important;
        font-weight: 700 !important;
        color: var(--basic-neutral-100) !important;
    `,
    pokemonListPagination: css`
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 20px 0 !important;
    `,
    pokemonListModalBody: css`
        background: var(--basic-neutral-100) !important;
        box-shadow: none !important;
        border: none !important;
        outline: none !important;
        border-radius: 24px !important;
        width: 1162px !important;
        min-height: 500px !important;
        padding: 20px 40px !important;
    `,
    pokemonListModalBodyHeader: css`
        display: flex;
        justify-content: end;
        font-size: 24px !important;
        font-weight: 800 !important;
        cursor: pointer;
        color: var(--basic-neutral-400) !important;
        margin-bottom: 10px;
    `,
    pokemonListModalBodyContent: css`
        display: flex;
    `,
    colorBasicNeutral500: css`
        color: var(--basic-neutral-500) !important;
    `,
};

export default PokemonList;
