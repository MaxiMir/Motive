import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    warning: {
      // motivation
      light: '#FFE0B2',
      main: '#FF9800', // шрифт
      dark: '#f57c00',
    },
    info: {
      // support
      light: '#B3E5FC',
      main: '#03A9F4', // шрифт
      dark: '#03A9F4',
    },
    success: {
      // creativity
      light: '#D1C4E9',
      main: '#BE9AFF', // шрифт
      dark: '#673AB7',
    },
    background: {
      default: '#19191A',
      paper: '#1C1C1E',
    },
    text: {
      primary: '#F5F5F7',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
          padding: 0,
          cursor:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFhUlEQVR4nO2aW2zTZRjGf+sOMDkVcJwMo4iA4IaFKZOTWVQShocVY2ZilC0ajV44Gq8X7SUBkxGi0cgFA/RiVyshxguDK5EwLoYFPCQU4lY3cAthq8m6sW719eLtt/3XwRgy04P/J/mumrT/93mf5/ne7/8VbNiwYcOGDRs2JiIHcESj0U1AXmLlAo7EZ1mNHLTY/Fu3bu2Mx+MdnZ2du4BCYAZKhiOVD/hfIwfIBwr3799fLAkMDg5+e/LkyQ3AbJSIXLJUDQ60wLnA4pGRkU5DQjwej/T09BwEnMBDQAFZaAsHKvcFQHFPT0+zJCEWi/3R1tbmQUmaSZbZwoF2twhY1dbW9qmISCAQEK/XK5FIZJSI/v7+7+rr61eSZbawErD6yJEjH4iI9PX1CSBOp1MaGxtHSRgZGfmrq6urnjFb5JPhashBZf0wsBrYYop1uVwCCCAVFRVy8eLFUSJu3779SzAYrCJLbDEDzYBHgfLe3t7fRURqa2tHCTAr2Ra9vb1NPp/PRYbbIh+YB6wAykKh0PciIocOHZpAACAul0v8fn9W2SIXmAM8Ajx5+vTpL0wQcgcCsNiio6PjXrbICDWYIFwCrD98+LDXFMUkBJjl8/kkEon8fQdbzEJnh7S3hQnCImANsN0U43a7p0TCnWwRCoXqUGsVkgG2KMAShN3d3T/fLQgnW8m2GBgYONfS0lKBWiytbWGCsBjYdOnSJf9kQXivlWyLmzdvfpXutshFt7JlwAa/339QRCQYDP4rAkjYIhAIjLPFtWvXPiRNbWGCcDGwrr6+/p37CcLJlsfjyQhbJE+E28wDV1RUPDAJTqdTfD6fWJGOtigA5gMrgc0mCL1e7wMTYFayLeLxeOTq1atvofYzx+2UIQ8dYpYDGy9fvtwsItLY2DgtxVdVVUlDQ4MEg0FJRiwW+xHNhZTawRqEpcePH//4QYLQ7XbLvn37pKWlZULBIiKDg4N/tre3f3P27Nn36+rqVid+O58UEmANwsf37t37+v0EocvlkpqaGjl69Kj09fVNKHhoaGjgypUrPx07duzLPXv2vAs8BzyFDl9LUfWl1AYmCBcCjwFbh4eH+6cShMkBZxAOh0NNTU1NtbW1nwBvAtXAK8BOYCtQimZOEWmgANAOOAEXUwxCt9s9WnB3d3fXmTNnfjhw4MBnQA3wBvAaWvQutOvbgDJgPVr8EsZmg5RvieOCsLW19WsREb/ff1cCTKiFw+EQ8DZa9KvAi8ALwLNAObAReAKVvAvNmiK0+LQ5Ruei+/JSoMQEYXt7+6TSHxoaGqisrPQCHlTe29EulwJr0TPG8sT3FqHb7Ry0cOv9Q8oHIvOWeBFJQeh0Ou8q/ebm5hPAS8AOtNNr0RcsyxLftQBV1iw0ZwpIo6KtyEE7cs8gNNK/fv36b8DLqLdL0MIXoVkym7FbpnzSYNqbCqxB+HRHR0eriIjP55sg/VgsFvV4PO+hPi9BZT6fsYuUjLxjtAah+/z58yesQWiV/qlTpxrRoHOjnZ+PSjw3Rc8+LRgXhA0NDR9ZgzBJ+ruBzcAq9CBVSIYXD+ODcG15eflu03FzSRKLxaKJaW4HsA4lKy0GmemANQhXAVui0WiPdcJLSP95VPrFaGbMIA328elCPlrUCqAsHA6fM8XfuHHjV6CSLJS+FXmM3RWUXrhw4aiIyPDwcH91dXUNOuhknfStcKBBuBhYYy5NA4HA5+h+v4Eslb6BORkuAFZUVlY+E4lE2tDxtgQ9xGSl9K0oIPHPEcDl8XjK0PeFxegOkZXStyIP7fA89ACzFCVjIZoPWSl9Kxxoh2ei3Z7L2AnOjLlZDweqhAK04+YUlxGHmulCDkqEWf+bwm3YsGHDhg0bNmzYsGHDRqbjHxAQfJQgo6GrAAAAAElFTkSuQmCC")4 4,auto !important;cursor:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48aW1hZ2UgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBRmhVbEVRVlI0bk8yYVcyelRaUmpHZitzT01Ea1ZjSndNbzRpQTRJYUZLWk9UV1ZRU2hvY1ZZMlppbEMwYWpWNDRHcThYN1NVQmt4R2kwY2dGQS9SaVZ5c2h4Z3VESzVFd0xvWUZQQ1FVNGxZM2NBdGhxOG02c1c3MTllTHR0LzNYd1JneTA0UC9KL211bXJULzkzbWY1L25lNy84VmJOaXdZY09HRFJzMkppSUhjRVNqMFUxQVhtTGxBbzdFWjFtTkhMVFkvRnUzYnUyTXgrTWRuWjJkdTRCQ1lBWktoaU9WRC9oZkl3ZklCd3IzNzk5ZkxBa01EZzUrZS9Ma3lRM0FiSlNJWExKVURRNjB3TG5BNHBHUmtVNURRandlai9UMDlCd0VuTUJEUUFGWmFBc0hLdmNGUUhGUFQwK3pKQ0VXaS8zUjF0Ym1RVW1hU1piWndvRjJ0d2hZMWRiVzlxbUlTQ0FRRUsvWEs1RklaSlNJL3Y3KzcrcnI2MWVTWmJhd0VyRDZ5SkVqSDRpSTlQWDFDU0JPcDFNYUd4dEhTUmdaR2ZtcnE2dXJuakZiNUpQaGFzaEJaZjB3c0JyWVlvcDF1VndDQ0NBVkZSVnk4ZUxGVVNKdTM3NzlTekFZckNKTGJERUR6WUJIZ2ZMZTN0N2ZSVVJxYTJ0SENUQXIyUmE5dmIxTlBwL1BSWWJiSWgrWUI2d0F5a0toMFBjaUlvY09IWnBBQUNBdWwwdjhmbjlXMlNJWG1BTThBang1K3ZUcEwwd1FjZ2NDc05paW82UGpYcmJJQ0RXWUlGd0NyRDk4K0xEWEZNVWtCSmpsOC9ra0VvbjhmUWRiekVKbmg3UzNoUW5DSW1BTnNOMFU0M2E3cDBUQ25Xd1JDb1hxVUdzVmtnRzJLTUFTaE4zZDNUL2ZMUWduVzhtMkdCZ1lPTmZTMGxLQldpeXRiV0dDc0JqWWRPblNKZjlrUVhpdmxXeUxtemR2ZnBYdXRzaEZ0N0psd0FhLzMzOVFSQ1FZRFA0ckFrallJaEFJakxQRnRXdlhQaVJOYldHQ2NER3dycjYrL3AzN0NjTEpsc2ZqeVFoYkpFK0UyOHdEVjFSVVBEQUpUcWRUZkQ2ZldKR090aWdBNWdNcmdjMG1DTDFlN3dNVFlGYXlMZUx4ZU9UcTFhdHZvZll6eCsyVUlROGRZcFlER3k5ZnZ0d3NJdExZMkRndHhWZFZWVWxEUTRNRWcwRkpSaXdXK3hITmhaVGF3UnFFcGNlUEgvLzRRWUxRN1hiTHZuMzdwS1dsWlVMQklpS0RnNE4vdHJlM2YzUDI3Tm4zNitycVZpZCtPNThVRW1BTndzZjM3dDM3K3YwRW9jdmxrcHFhR2psNjlLajA5ZlZOS0hob2FHamd5cFVyUHgwN2R1ekxQWHYydkFzOEJ6eUZEbDlMVWZXbDFBWW1DQmNDandGYmg0ZUgrNmNTaE1rQlp4QU9oME5OVFUxTnRiVzFud0J2QXRYQUs4Qk9ZQ3RRaW1aT0VXbWdBTkFPT0FFWFV3eEN0OXM5V25CM2QzZlhtVE5uZmpodzRNQm5RQTN3QnZBYVd2UXV0T3ZiZ0RKZ1BWcjhFc1ptZzVSdmllT0NzTFcxOVdzUkViL2ZmMWNDVEtpRncrRVE4RFphOUt2QWk4QUx3TE5BT2JBUmVBS1Z2QXZObWlLMCtMUTVSdWVpKy9KU29NUUVZWHQ3KzZUU0h4b2FHcWlzclBRQ0hsVGUyOUV1bHdKcjBUUEc4c1QzRnFIYjdSeTBjT3Y5UThvSEl2T1dlQkZKUWVoME91OHEvZWJtNWhQQVM4QU90Tk5yMFJjc3l4TGZ0UUJWMWl3MFp3cElvNkt0eUVFN2NzOGdOTksvZnYzNmI4RExxTGRMME1JWG9Wa3ltN0ZicG56U1lOcWJDcXhCK0hSSFIwZXJpSWpQNTVzZy9WZ3NGdlY0UE8raFBpOUJaVDZmc1l1VWpMeGp0QWFoKy96NTh5ZXNRV2lWL3FsVHB4clJvSE9qblorUFNqdzNSYzgrTFJnWGhBME5EUjlaZ3pCSitydUJ6Y0FxOUNCVlNJWVhEK09EY0cxNWVmbHUwM0Z6U1JLTHhhS0phVzRIc0E0bEt5MEdtZW1BTlFoWEFWdWkwV2lQZGNKTFNQOTVWUHJGYUdiTUlBMzI4ZWxDUGxyVUNxQXNIQTZmTThYZnVISGpWNkNTTEpTK0ZYbU0zUldVWHJodzRhaUl5UER3Y0g5MWRYVU5PdWhrbmZTdGNLQkJ1QmhZWXk1TkE0SEE1K2grdjRFc2xiNkJPUmt1QUZaVVZsWStFNGxFMnREeHRnUTl4R1NsOUswb0lQSFBFY0RsOFhqSzBQZUZ4ZWdPa1pYU3R5SVA3ZkE4OUFDekZDVmpJWm9QV1NsOUt4eG9oMmVpM1o3TDJBbk9qTGxaRHdlcWhBSzA0K1lVbHhHSG11bENEa3FFV2YrYndtM1lzR0hEaGcwYk5tellzR0hEUnFiakh4QVFmSlFnbzZHckFBQUFBRWxGVGtTdVFtQ0MiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPjwvc3ZnPg==)4 4,auto !important;cursor:-webkit-image-set(url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFhUlEQVR4nO2aW2zTZRjGf+sOMDkVcJwMo4iA4IaFKZOTWVQShocVY2ZilC0ajV44Gq8X7SUBkxGi0cgFA/RiVyshxguDK5EwLoYFPCQU4lY3cAthq8m6sW719eLtt/3XwRgy04P/J/mumrT/93mf5/ne7/8VbNiwYcOGDRs2JiIHcESj0U1AXmLlAo7EZ1mNHLTY/Fu3bu2Mx+MdnZ2du4BCYAZKhiOVD/hfIwfIBwr3799fLAkMDg5+e/LkyQ3AbJSIXLJUDQ60wLnA4pGRkU5DQjwej/T09BwEnMBDQAFZaAsHKvcFQHFPT0+zJCEWi/3R1tbmQUmaSZbZwoF2twhY1dbW9qmISCAQEK/XK5FIZJSI/v7+7+rr61eSZbawErD6yJEjH4iI9PX1CSBOp1MaGxtHSRgZGfmrq6urnjFb5JPhashBZf0wsBrYYop1uVwCCCAVFRVy8eLFUSJu3779SzAYrCJLbDEDzYBHgfLe3t7fRURqa2tHCTAr2Ra9vb1NPp/PRYbbIh+YB6wAykKh0PciIocOHZpAACAul0v8fn9W2SIXmAM8Ajx5+vTpL0wQcgcCsNiio6PjXrbICDWYIFwCrD98+LDXFMUkBJjl8/kkEon8fQdbzEJnh7S3hQnCImANsN0U43a7p0TCnWwRCoXqUGsVkgG2KMAShN3d3T/fLQgnW8m2GBgYONfS0lKBWiytbWGCsBjYdOnSJf9kQXivlWyLmzdvfpXutshFt7JlwAa/339QRCQYDP4rAkjYIhAIjLPFtWvXPiRNbWGCcDGwrr6+/p37CcLJlsfjyQhbJE+E28wDV1RUPDAJTqdTfD6fWJGOtigA5gMrgc0mCL1e7wMTYFayLeLxeOTq1atvofYzx+2UIQ8dYpYDGy9fvtwsItLY2DgtxVdVVUlDQ4MEg0FJRiwW+xHNhZTawRqEpcePH//4QYLQ7XbLvn37pKWlZULBIiKDg4N/tre3f3P27Nn36+rqVid+O58UEmANwsf37t37+v0EocvlkpqaGjl69Kj09fVNKHhoaGjgypUrPx07duzLPXv2vAs8BzyFDl9LUfWl1AYmCBcCjwFbh4eH+6cShMkBZxAOh0NNTU1NtbW1nwBvAtXAK8BOYCtQimZOEWmgANAOOAEXUwxCt9s9WnB3d3fXmTNnfjhw4MBnQA3wBvAaWvQutOvbgDJgPVr8EsZmg5RvieOCsLW19WsREb/ff1cCTKiFw+EQ8DZa9KvAi8ALwLNAObAReAKVvAvNmiK0+LQ5Ruei+/JSoMQEYXt7+6TSHxoaGqisrPQCHlTe29EulwJr0TPG8sT3FqHb7Ry0cOv9Q8oHIvOWeBFJQeh0Ou8q/ebm5hPAS8AOtNNr0RcsyxLftQBV1iw0ZwpIo6KtyEE7cs8gNNK/fv36b8DLqLdL0MIXoVkym7FbpnzSYNqbCqxB+HRHR0eriIjP55sg/VgsFvV4PO+hPi9BZT6fsYuUjLxjtAah+/z58yesQWiV/qlTpxrRoHOjnZ+PSjw3Rc8+LRgXhA0NDR9ZgzBJ+ruBzcAq9CBVSIYXD+ODcG15eflu03FzSRKLxaKJaW4HsA4lKy0GmemANQhXAVui0WiPdcJLSP95VPrFaGbMIA328elCPlrUCqAsHA6fM8XfuHHjV6CSLJS+FXmM3RWUXrhw4aiIyPDwcH91dXUNOuhknfStcKBBuBhYYy5NA4HA5+h+v4Eslb6BORkuAFZUVlY+E4lE2tDxtgQ9xGSl9K0oIPHPEcDl8XjK0PeFxegOkZXStyIP7fA89ACzFCVjIZoPWSl9Kxxoh2ei3Z7L2AnOjLlZDweqhAK04+YUlxGHmulCDkqEWf+bwm3YsGHDhg0bNmzYsGHDRqbjHxAQfJQgo6GrAAAAAElFTkSuQmCC")2x,url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFhUlEQVR4nO2aW2zTZRjGf+sOMDkVcJwMo4iA4IaFKZOTWVQShocVY2ZilC0ajV44Gq8X7SUBkxGi0cgFA/RiVyshxguDK5EwLoYFPCQU4lY3cAthq8m6sW719eLtt/3XwRgy04P/J/mumrT/93mf5/ne7/8VbNiwYcOGDRs2JiIHcESj0U1AXmLlAo7EZ1mNHLTY/Fu3bu2Mx+MdnZ2du4BCYAZKhiOVD/hfIwfIBwr3799fLAkMDg5+e/LkyQ3AbJSIXLJUDQ60wLnA4pGRkU5DQjwej/T09BwEnMBDQAFZaAsHKvcFQHFPT0+zJCEWi/3R1tbmQUmaSZbZwoF2twhY1dbW9qmISCAQEK/XK5FIZJSI/v7+7+rr61eSZbawErD6yJEjH4iI9PX1CSBOp1MaGxtHSRgZGfmrq6urnjFb5JPhashBZf0wsBrYYop1uVwCCCAVFRVy8eLFUSJu3779SzAYrCJLbDEDzYBHgfLe3t7fRURqa2tHCTAr2Ra9vb1NPp/PRYbbIh+YB6wAykKh0PciIocOHZpAACAul0v8fn9W2SIXmAM8Ajx5+vTpL0wQcgcCsNiio6PjXrbICDWYIFwCrD98+LDXFMUkBJjl8/kkEon8fQdbzEJnh7S3hQnCImANsN0U43a7p0TCnWwRCoXqUGsVkgG2KMAShN3d3T/fLQgnW8m2GBgYONfS0lKBWiytbWGCsBjYdOnSJf9kQXivlWyLmzdvfpXutshFt7JlwAa/339QRCQYDP4rAkjYIhAIjLPFtWvXPiRNbWGCcDGwrr6+/p37CcLJlsfjyQhbJE+E28wDV1RUPDAJTqdTfD6fWJGOtigA5gMrgc0mCL1e7wMTYFayLeLxeOTq1atvofYzx+2UIQ8dYpYDGy9fvtwsItLY2DgtxVdVVUlDQ4MEg0FJRiwW+xHNhZTawRqEpcePH//4QYLQ7XbLvn37pKWlZULBIiKDg4N/tre3f3P27Nn36+rqVid+O58UEmANwsf37t37+v0EocvlkpqaGjl69Kj09fVNKHhoaGjgypUrPx07duzLPXv2vAs8BzyFDl9LUfWl1AYmCBcCjwFbh4eH+6cShMkBZxAOh0NNTU1NtbW1nwBvAtXAK8BOYCtQimZOEWmgANAOOAEXUwxCt9s9WnB3d3fXmTNnfjhw4MBnQA3wBvAaWvQutOvbgDJgPVr8EsZmg5RvieOCsLW19WsREb/ff1cCTKiFw+EQ8DZa9KvAi8ALwLNAObAReAKVvAvNmiK0+LQ5Ruei+/JSoMQEYXt7+6TSHxoaGqisrPQCHlTe29EulwJr0TPG8sT3FqHb7Ry0cOv9Q8oHIvOWeBFJQeh0Ou8q/ebm5hPAS8AOtNNr0RcsyxLftQBV1iw0ZwpIo6KtyEE7cs8gNNK/fv36b8DLqLdL0MIXoVkym7FbpnzSYNqbCqxB+HRHR0eriIjP55sg/VgsFvV4PO+hPi9BZT6fsYuUjLxjtAah+/z58yesQWiV/qlTpxrRoHOjnZ+PSjw3Rc8+LRgXhA0NDR9ZgzBJ+ruBzcAq9CBVSIYXD+ODcG15eflu03FzSRKLxaKJaW4HsA4lKy0GmemANQhXAVui0WiPdcJLSP95VPrFaGbMIA328elCPlrUCqAsHA6fM8XfuHHjV6CSLJS+FXmM3RWUXrhw4aiIyPDwcH91dXUNOuhknfStcKBBuBhYYy5NA4HA5+h+v4Eslb6BORkuAFZUVlY+E4lE2tDxtgQ9xGSl9K0oIPHPEcDl8XjK0PeFxegOkZXStyIP7fA89ACzFCVjIZoPWSl9Kxxoh2ei3Z7L2AnOjLlZDweqhAK04+YUlxGHmulCDkqEWf+bwm3YsGHDhg0bNmzYsGHDRqbjHxAQfJQgo6GrAAAAAElFTkSuQmCC")1x)4 4,auto',
        },
        button: {
          textTransform: 'none',
        },
        footer: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 16,
        },
      },
    },
  },
})
