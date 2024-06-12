import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import { ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { IAutocompleteInputProps, IMovieOption } from "@/interfaces";
import { useTheme } from "@mui/material/styles";

const Input: React.FC<IAutocompleteInputProps> = ({
  id,
  label,
  fetchOptions,
  disableClearable = false,
  type = "text",
  onChange,
}) => {
  const [options, setOptions] = React.useState<IMovieOption[]>([]);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOptions();
      setOptions(data);
    };

    fetchData();
  }, [fetchOptions]);

  const getOptionLabel = (option: string | IMovieOption) => {
    return typeof option === "string" ? option : option.title;
  };

  return (
    <Stack spacing={2} sx={{ width: "75%", margin: "0 auto" }}>
      <Autocomplete
        id={id}
        freeSolo
        disableClearable={disableClearable}
        options={options}
        getOptionLabel={getOptionLabel}
        onInputChange={(event, value) => onChange(value)}
        renderOption={(props, option) => (
          <li {...props} style={{ backgroundColor: "black", color: "white" }}>
            <Link href={`/movie/${option.id}`} legacyBehavior>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemAvatar>
                  {option.posterPath && (
                    <Avatar
                      src={`https://image.tmdb.org/t/p/w200${option.posterPath}`}
                      alt={option.title}
                      sx={{ width: 40, height: 40, marginRight: 1 }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText primary={option.title} />
              </a>
            </Link>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: type,
              startAdornment: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              ),
            }}
          />
        )}
        PaperComponent={(props) => (
          <div
            {...props}
            style={{ backgroundColor: "black", color: "white" }}
          />
        )}
      />
    </Stack>
  );
};

export default Input;
