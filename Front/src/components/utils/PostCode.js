import { useState, useRef, useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';

function Postcode({ setFormData, formData }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const postcodeRef = useRef(null);

    // useCallback을 사용하여 handlePostcode 함수를 memoization
    // => 이전에 계산한 값을 저장하여 반복 수행을 제거, 실행 속도를 높임
    const handlePostcode = useCallback((data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setFormData((prev) => ({
            ...prev,
            post: data.zonecode,
            addr1: fullAddress,
        }));
        
        setIsPopupOpen(false);
    }, [setFormData]); // setFormData가 변경될 때만 함수 재생성

    const handleOpenPostcode = () => {
        setIsPopupOpen(true);
    };

    const handleClosePostcode = () => {
        setIsPopupOpen(false);
    };

    const postcodeStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
        border: '1px solid #000',
        width: '500px',
        height: '475px',
    };

    return (
        <div>
            <input
                type="text"
                size={10}
                className="input-sm"
                name="post"
                value={formData.post || ''}
                readOnly
                ref={postcodeRef}
            />
            &nbsp;
            <button
                type="button"
                className="btn btn-sm btn-outline-info"
                onClick={handleOpenPostcode}
            >
                우편번호 검색
            </button>
            {isPopupOpen && (
                <div style={postcodeStyle}>
                    <DaumPostcode
                        onComplete={handlePostcode}
                        onClose={handleClosePostcode}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            )}
        </div>
    );
}

export default Postcode;