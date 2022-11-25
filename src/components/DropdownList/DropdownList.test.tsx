import { DropdownList, DropdownListProps } from "./DropdownList";
import { fireEvent, render } from "@testing-library/react";

const labels = {
  hide: "Hide",
  show: "Show",
};

const data = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
];

const makeSut = (props: Partial<DropdownListProps>) => {
  return render(
    <DropdownList
      data={data}
      labels={labels}
      onRemoveItem={jest.fn()}
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
  test("Should render ul component when click on button", () => {
    const { container, getByText } = makeSut({});
    const showLabel = labels.show;
    fireEvent.click(getByText(showLabel));
    expect(container.querySelector("ul")).toBeInTheDocument();
  });

  test("Should switch button label on click", () => {
    const { getByText } = makeSut({});
    expect(getByText(labels.show)).toBeInTheDocument();
    fireEvent.click(getByText(labels.show));
    expect(getByText(labels.hide)).toBeInTheDocument();
  });

  test("Should render 3 li correctly", () => {
    const { container, getByText } = makeSut({});
    fireEvent.click(getByText(labels.show));
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });

  test("Should call onRemoveItem callback correctly", () => {
    const onRemoveItem = jest.fn();
    const { getByText, getAllByText } = makeSut({ onRemoveItem });
    fireEvent.click(getByText(labels.show));
    fireEvent.click(getAllByText(/Remove/)[2]);
    expect(onRemoveItem).toHaveBeenCalledWith(data[2], 2);
  });
});
