import React, { FC } from "react";
import {
    Box,
    Grid,
    FormControl,
    MenuItem,
    Select,
    Container,
} from "@material-ui/core";
import { css } from "emotion";

const LangSelector: FC<LangSelector> = ({ locale, handleChange }) => {
    return (
        <Container maxWidth="lg">
            <Box component="div" className={style.headerLangSelector}>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Grid item>
                        <FormControl className={style.selectFormControl}>
                            <Select
                                disableUnderline
                                variant="standard"
                                value={locale}
                                onChange={(e) =>
                                    handleChange(`${e.target.value}`)
                                }
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="id">Bahasa Indonesia</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

interface LangSelector {
    locale: string;
    handleChange: any;
}

const style = {
    headerLangSelector: css`
        display: flex !important;
        align-items: center !important;
    `,
    selectFormControl: css`
        width: 200px !important;
        margin: 7px !important;
    `,
};

export default LangSelector;
