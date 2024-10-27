import { render, screen } from '@testing-library/react';
import Table from './Table';
import { ProcessedData } from '../types';

// May want to define some mock data here
const mockProcessedData = [
  {
    id: 1,
    notes:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    engineerId: 123,
    coords: [-1.157, 51.921],
  },
  {
    id: 2,
    notes:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    engineerId: 123,
    coords: [-1.1565, 51.92071],
  },
  {
    id: 3,
    notes:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    engineerId: 123,
    coords: [-1.1569, 51.9206],
  },
  {
    id: 4,
    notes:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
    engineerId: 124,
    coords: [-1.157, 51.92059],
  },
  {
    id: 5,
    notes:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    engineerId: 124,
    coords: [-1.15689, 51.92067],
  },
  {
    id: 6,
    notes: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
    engineerId: 124,
    coords: [-1.15691, 51.9206],
  },
  {
    id: 7,
    notes:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
    engineerId: 124,
    coords: [-1.15687, 51.92061],
  },
  {
    id: 8,
    notes: 'Et harum quidem rerum facilis est et expedita distinctio.',
    engineerId: 124,
    coords: [-1.15681, 51.92057],
  },
  {
    id: 9,
    notes:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
    engineerId: 125,
    coords: [-1.1561, 51.92072],
  },
  {
    id: 10,
    notes: 'Omnis voluptas assumenda est, omnis dolor repellendus.',
    engineerId: 126,
    coords: [-1.15689, 51.92061],
  },
] as ProcessedData[];

describe('table component', () => {
  it('should render the table component', () => {
    render(<Table data={mockProcessedData} />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Table data={mockProcessedData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('table rows', () => {
  it('should match the row length', () => {
    render(<Table data={mockProcessedData} />);
    const rowElements = screen.getAllByRole('row');
    expect(rowElements.length).toEqual(mockProcessedData.length + 1); // Account for header
  });

  it('should match the row ids data', () => {
    render(<Table data={mockProcessedData} />);

    mockProcessedData.forEach(({ id }) => {
      const cell = screen.getByText(id);
      expect(cell).toBeInTheDocument();
    });
  });

  it('should render correctly without data', () => {
    render(<Table data={[]} />);
    const rowElements = screen.queryAllByRole('row');
    expect(rowElements.length).toEqual(1); // Account for header
  });
});
