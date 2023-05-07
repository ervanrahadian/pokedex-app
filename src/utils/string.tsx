export const getFormattedPokemonName = (str: string) => {
    if (str) {
        const arr = str.split("-");

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        return arr.join(" ");
    } else {
        return "";
    }
};

export const getBackgroundColorBadge = (str: string) => {
    if (str) {
        const types = [
            {
                name: "normal",
                color: "var(--primary-blue-700)",
            },
            {
                name: "fighting",
                color: "var(--primary-blue-600)",
            },
            {
                name: "flying",
                color: "var(--primary-blue-500)",
            },
            {
                name: "poison",
                color: "var(--primary-orange-700)",
            },
            {
                name: "ground",
                color: "var(--primary-orange-600)",
            },
            {
                name: "rock",
                color: "var(--primary-orange-500)",
            },
            {
                name: "bug",
                color: "var(--secondary-purple-700)",
            },
            {
                name: "ghost",
                color: "var(--secondary-purple-600)",
            },
            {
                name: "steel",
                color: "var(--secondary-purple-500)",
            },
            {
                name: "fire",
                color: "var(--secondary-red-700)",
            },
            {
                name: "water",
                color: "var(--secondary-red-600)",
            },
            {
                name: "grass",
                color: "var(--secondary-red-500)",
            },
            {
                name: "electric",
                color: "var(--secondary-yellow-700)",
            },
            {
                name: "psychic",
                color: "var(--secondary-yellow-600)",
            },
            {
                name: "ice",
                color: "var(--secondary-yellow-500)",
            },
            {
                name: "dragon",
                color: "var(--secondary-green-700)",
            },
            {
                name: "dark",
                color: "var(--secondary-green-600)",
            },
            {
                name: "fairy",
                color: "var(--secondary-green-500)",
            },
            {
                name: "unknown",
                color: "var(--basic-neutral-700)",
            },
            {
                name: "shadow",
                color: "var(--basic-neutral-600)",
            },
        ];

        return (
            types.filter((single) => single.name === str)[0].color ||
            "var(--basic-neutral-500)"
        );
    } else {
        return "var(--basic-neutral-500)";
    }
};

export const getStatsColor = (num: number) => {
    if (num) {
        const types = [
            {
                item: 0,
                color: "var(--primary-blue-700)",
            },
            {
                item: 1,
                color: "var(--primary-blue-600)",
            },
            {
                item: 2,
                color: "var(--primary-blue-500)",
            },
            {
                item: 3,
                color: "var(--primary-orange-700)",
            },
            {
                item: 4,
                color: "var(--primary-orange-600)",
            },
            {
                item: 5,
                color: "var(--primary-orange-500)",
            },
        ];

        return types[num].color || "var(--basic-neutral-500)";
    } else {
        return "var(--basic-neutral-500)";
    }
};
