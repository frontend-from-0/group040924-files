import { AuthForm, validatePassword } from '@/components/AuthForm';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const handleSubmitMock = jest.fn();

describe('AuthForm', () => {
  it('snapshot for signup form is not modified', () => {
    const { container } = render(<AuthForm type={'signup'} onSubmit={handleSubmitMock} />)
    expect(container).toMatchSnapshot();
  })

    it('snapshot for login form is not modified', () => {
    const { container } = render(<AuthForm type={'login'} onSubmit={handleSubmitMock} />)
    expect(container).toMatchSnapshot();
  })


  it('signup form renders correctly', () => {
    render(<AuthForm type={'signup'} onSubmit={handleSubmitMock} />);

    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeVisible();
    expect(screen.getByText('Password')).toBeVisible();
    expect(screen.getByText('Create Account')).toBeVisible();
  });

  it('error message is not shown by default', () => {
    render(<AuthForm type={'signup'} onSubmit={handleSubmitMock} />);

    expect(screen.queryByTestId('form-error')).toBeNull();
  });

  it('verifies password correctly', () => {
    expect(validatePassword('asdas')).toEqual({
      success: false,
      message: 'Password must be at least 6 and max 50 characters.',
    });

    expect(validatePassword('12345    ')).toEqual({ success: true });

    const veryLongString =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    expect(validatePassword(veryLongString)).toEqual({
      success: false,
      message: 'Password must be at least 6 and max 50 characters.',
    });
  });
});
