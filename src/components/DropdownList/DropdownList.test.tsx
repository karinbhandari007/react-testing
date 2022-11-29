import { DropdownList, DropdownListProps } from "./DropdownList";
import { fireEvent, render } from "@testing-library/react";
import {screen} from '@testing-library/dom'

const labels = {
  hide: "Hide",
  show: "Show",
};

const data = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
];


// render function ->  render the component in a container ( and return some helpers 
// like: getByText, getByTestId, getByRole,
const makeSut = (props: Partial<DropdownListProps>) => { // Sut: System Under Test
  return render(                     
    <DropdownList
      data={data}
      labels={labels}
      onRemoveItem={jest.fn()}
      data-testid="dropdown-ul"
      {...props}
    />
  );
};

describe("<DropdownList />", () => {
  test("Should not render ul component on initial render", () => {
    const { container } = makeSut({});

    expect(container.querySelector("ul")).not.toBeInTheDocument();
  });

  /**
   * TODO: Write test case for the following cases
   * Check if list is visible after one click on the button
   * Check if button labels are changing
   * Check if all items have been rendered correctly
   * Check if the remove callback is being called with correct values
   */
 
// container prop return the HTMLElement of the container, 
// so you can find elements and do all DOM manipulation you want

// 1. * Check if list is visible after one click on the button
   test("Should render ul component when click on button", () => {      //unordered lists
    const { container, getByText } = makeSut({});
    fireEvent.click(getByText(labels.show));
    expect(container.querySelector("ul")).toBeInTheDocument();
 
  });


//second method using screen //  Using `screen` and avoiding container:
//screen
//getByTestId
    test("Should render ul component when click on button", () => {
    const { getByText } = makeSut({});
    fireEvent.click(getByText(labels.show));
    expect(screen.getByTestId('dropdown-ul')).toBeInTheDocument();
  });



  // 2. * Check if button labels are changing  
  //getByText, 

  test("Should switch button label on click", () => {
     const { getByText } = makeSut({});

     expect(getByText(labels.show)).toBeInTheDocument();
     
     fireEvent.click(getByText(labels.show));
     expect(getByText(labels.hide)).toBeInTheDocument();
  });



//3.

  test("Should render 3 li correctly", () => {
        const { getByText, container } = makeSut({});
        fireEvent.click(getByText(labels.show));
        expect(container.querySelectorAll("li").length).toBe(3);
  
 
  });


  test("Should render 3 li correctly", () => {
        const { getByText} = makeSut({});

     fireEvent.click(screen.getByRole('button', {name: /Show/i}))
     expect(screen.getAllByRole('listitem')).toHaveLength(3)
  });


  // 4.
  //The jest.fn method allows us to create a new mock function directly

  test("Should call onRemoveItem callback correctly", () => {
     const onRemoveItem = jest.fn();    //mock function

    const { getByText, getAllByText } = makeSut({ onRemoveItem });

    fireEvent.click(getByText(labels.show));

    fireEvent.click(getAllByText(/Remove/i)[1]);  //use regular expression OR string
    //mock onRemoveItem
    // "label": "Item 2",
    //  "value": "2",
    expect(onRemoveItem).toHaveBeenCalledWith(data[1], 1);//Number of calls: 1


     
  });
});
