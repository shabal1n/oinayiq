const districts = [
  {
    label: "Almaly",
    value: "Almaly",
    latlng: [43.254421, 76.902184],
    region: "Almaty",
  },
  {
    label: "Bostandyq",
    value: "Bostandyq",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Turksib",
    value: "Turksib",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Auezov",
    value: "Auezov",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Medeu",
    value: "Medeu",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Nauryzbay",
    value: "Nauryzbay",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Zhetysu",
    value: "Zhetysu",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Zhetygen",
    value: "Zhetygen",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Karasay",
    value: "Karasay",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Talgar",
    value: "Talgar",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Uigur",
    value: "Uigur",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Zhetisu",
    value: "Zhetisu",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Karassay",
    value: "Karassay",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Koksu",
    value: "Koksu",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Enbekshikazakh",
    value: "Enbekshikazakh",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Ili",
    value: "Ili",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Raimbek",
    value: "Raimbek",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Sarkand",
    value: "Sarkand",
    latlng: [0, 0],
    region: "Almaty",
  },
  {
    label: "Talgar",
    value: "Talgar",
    latlng: [0, 0],
    region: "Almaty",
  },
];

const useDistricts = () => {
  const getAll = () => districts;

  const getByValue = (value: string) => {
    return districts.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useDistricts;
