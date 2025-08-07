import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: string;
    touched?: boolean;
    placeholder: string;
    toggleVisibility?: () => void;
    showToggle?: boolean;
    showPassword?: boolean;
    name?: string;
    required?: boolean;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    describedById?: string;
}

const Field = ({
    id,
    label,
    type,
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    toggleVisibility,
    showToggle = false,
    showPassword = false,
    name,
    required = false,
    autoComplete,
    inputMode,
    describedById,
}: FieldProps) => {
    const isInvalid = Boolean(error && touched);
    const errorId = `${id}-error`;
    const computedDescribedBy =
        [describedById, isInvalid ? errorId : undefined]
            .filter(Boolean)
            .join(' ') || undefined;

    const computedAutoComplete =
        typeof autoComplete !== 'undefined'
            ? autoComplete
            : type === 'email'
            ? 'email'
            : type === 'password'
            ? 'current-password'
            : 'off';

    return (
        <div className='space-y-2'>
            <label htmlFor={id} className='block text-sm font-medium text-left'>
                {label}
            </label>
            <div className='relative'>
                <input
                    id={id}
                    name={name || id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`
                        w-full pl-4 pr-${showToggle ? '12' : '4'} py-3 
                        bg-input border border-border rounded-lg
                        text-black 
                        transition-all duration-300 ease-smooth
                        hover:border-input-hover hover:bg-input-hover/50
                        focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus
                        ${isInvalid ? 'border-red-400 focus:ring-red-400' : ''}
                    `}
                    placeholder={placeholder}
                    autoComplete={computedAutoComplete}
                    inputMode={inputMode}
                    required={required}
                    aria-required={required}
                    aria-invalid={isInvalid}
                    aria-describedby={computedDescribedBy}
                    aria-errormessage={isInvalid ? errorId : undefined}
                />
                {showToggle && toggleVisibility && (
                    <button
                        type='button'
                        onClick={toggleVisibility}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200'
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        aria-pressed={showPassword}
                        aria-controls={id}>
                        {showPassword ? (
                            <FaEyeSlash aria-hidden />
                        ) : (
                            <FaEye aria-hidden />
                        )}
                    </button>
                )}
            </div>
            {isInvalid && (
                <p
                    id={errorId}
                    className='text-sm text-left text-red-400 animate-in slide-in-from-top-1 duration-200'
                    role='alert'>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Field;
