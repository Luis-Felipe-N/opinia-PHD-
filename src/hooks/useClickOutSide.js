export function useClickOutSide() {
    const clickOutSide = ( element, state, setState ) => {
        document.addEventListener('click', handleClickOutSide)

        function handleClickOutSide( event ) {               
            if(!element.contains(event.target) ) {
                document.removeEventListener('click', handleClickOutSide)
                setState(false)
            }
        }
    }

    return clickOutSide
}