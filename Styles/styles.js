import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  LoginPage: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  IntroPage: {
    flex: 1,
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop:10,
    alignSelf:'center',
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "#00000024",
    borderRadius: 15,
    color: "#79767C",
  },
  buttonLogin: {
    backgroundColor: "#264653",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  fieldContainer: {
    width: "95%",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  TextStyle: {
    color: "black",
    marginLeft: "1%",
  },
  collapsibleArea: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  seatRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    marginTop: 10,
  },
  IntroButton: {
    backgroundColor: "#242424",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  seatAcceptButton: {
    backgroundColor: "#264653",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  seatButton: {
    width: 30,
    height: 30,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  seatNumber: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  emptyRow: {
    height: 23,
    width: 23,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  button: {
    backgroundColor: "#586165",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "flex-start",
  },
  buttonText2: {
    color: "#efaeae",
    textAlign: "center",
    justifyContent: "flex-start",
  },
  searchbus: {
    backgroundColor: "#264653",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchbusButton: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },
  searchbusView: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Road Selection
  roadView: {
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  roadSelection: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    width: "90%",
  },
  roadButton: {
    backgroundColor: "#fafafa",
    flexDirection: "column",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  roadButtonText: {
    color: "#000",
    textAlign: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    color: "#000",
    textAlign: "center",
  },

  // Location Selection
  locationView: {
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  locationSelection: {
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    width: "100%",
  },
  locationWays: {
    flexDirection: "column",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    width: "93%",
  },
  locationButton: {
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  locationIcon: {
    width: "7%",
    justifyContent: "center",
    marginTop: 20,
  },
  distanceImage: {
    width: 20,
    height: 80,
    resizeMode: "contain",
    tintColor: "gray",
  },
  locationButtonHeaderText: {
    color: "red",
    textTransform: "uppercase",
    fontSize: 10,
    marginBottom: 4,
    textAlign: "center",
    justifyContent: "flex-start",
  },
  locationCityView: {
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    width: "100%",
    borderColor: "#000",
    borderWidth: 0.5,
  },
  locationButtonText: {
    color: "#000",
    fontSize: 10,
    textAlign: "center",
    justifyContent: "flex-start",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 18,
    height: 18,
    tintColor: "gray",
  },
  itemTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  selectedItem: {
    backgroundColor: "green",
  },
  // Tarih Seçme

  dateView: {
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dateSelection: {
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    width: "100%",
  },
  dateWays: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    width: "45%",
  },
  dateWays2: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    width: "90%",
  },
  dateButton: {
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  dateIcon: {
    width: "7%",
    justifyContent: "center",
    marginTop: 20,
  },
  distanceImage: {
    width: 20,
    height: 80,
    resizeMode: "contain",
    tintColor: "gray",
  },
  dateButtonHeaderText: {
    color: "red",
    textTransform: "uppercase",
    fontSize: 10,
    marginBottom: 4,
    textAlign: "center",
    justifyContent: "flex-start",
  },
  dateCityView: {
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    width: "100%",
    borderColor: "#000",
    borderWidth: 0.5,
  },
  dateButtonText: {
    color: "#000",
    fontSize: 10,
    textAlign: "center",
    justifyContent: "flex-start",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },

  datePicker: {
    borderRadius: 10,
  },

  //
  SeferContainerView: {
    flexDirection: "row",
    width: "100%",
    height: "80%",
  },
  SeferFirmaView: {
    height: "100%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  SeferFirmaResim: {
    width: "90%",
    height: "60%",
    resizeMode: "cover",
  },
  SeferTimeView: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
  },
  SeferTimeText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  SeferPriceText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  SeferDropdownView: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
  },
  SeferKoltukSecView: {
    alignItems: "flex-end",
    width: "40%",
    justifyContent: "center",
  },
  SeferDropdown: {
    width: "100%",
    height: "20%",
    alignContent: "center",
    borderTopColor: "#00000064",
    borderTopWidth: 1,
    paddingLeft: 5,
    flexDirection: "row",
  },
  SeferDropdownInfoErkek: {
    width: 15,
    height: 15,
    backgroundColor: "#457b9d",
    borderRadius: 4,
  },
  SeferDropdownInfoKadin: {
    width: 15,
    height: 15,
    backgroundColor: "pink",
    borderRadius: 4,
  },
  SeferDropdownInfoBos: {
    width: 15,
    height: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  SeferDropdownInfo: { paddingTop: 10, width: "100%", alignItems: "center" },
  SeferOtobus: {
    backgroundColor: "#fff",
    height: 210,
    paddingTop: 10,
    alignContent: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  SeferOtobusBG: {
    resizeMode: "cover",
    height: 200,
    width: 660,
  },
  SeferPopoverMan: {
    width: 50,
    height: 50,
    tintColor: "blue",
    marginRight: 20,
  },
  SeferPopoverWoman: {
    width: 50,
    height: 50,
    tintColor: "pink",
  },
  SeferPopoverView: {
    flexDirection: "row",
    width: 150,
    justifyContent: "center",
    padding: 10,
  },
  SeferOdeme: {
    justifyContent: "flex-start",
    height: "35%",
    alignContent: "center",
    width: "100%",
  },
  SeferOdemeView: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  OtobusSecContainer: {
    flex: 1,
    width: "97%",
    marginBottom: 50,
    height: "100%",
  },
});

export default styles;
