import { StyleSheet } from 'react-native';

/**
 * Paleta de colores moderna y vibrante
 */
export const COLORS = {
    // Neutros
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',

    // Primario (Azul Vibrante)
    primary: '#0066FF',
    primaryLight: '#E6F2FF',
    primaryDark: '#0052CC',
    primarySoft: '#F0F7FF',

    // Secundario (Rosa/Magenta)
    secondary: '#FF3B7F',
    secondaryLight: '#FFE6F0',
    secondaryDark: '#E60052',

    // Terciario (Verde)
    tertiary: '#00D084',
    tertiaryLight: '#E6FFF5',
    tertiaryDark: '#00A366',

    // Estados
    success: '#00D084',
    warning: '#FF9500',
    error: '#FF3B3B',
    info: '#0066FF',

    // Tipo de sangre
    bloodRed: '#FF2E5C',

    // Gradientes (como strings para referencia)
    gradientBlue: ['#0066FF', '#0052CC'],
    gradientPink: ['#FF3B7F', '#E60052'],
    gradientGreen: ['#00D084', '#00A366'],
};

/**
 * Estilos globales reutilizables
 */
export const globalStyles = StyleSheet.create({
    // Contenedores
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    containerGray: {
        flex: 1,
        backgroundColor: COLORS.gray50,
    },

    paddingContainer: {
        padding: 16,
    },

    paddingLarge: {
        padding: 20,
    },

    // Headers
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray200,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
    },

    // Cards
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: COLORS.gray200,
    },

    cardSimple: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: COLORS.gray100,
    },

    // Botones
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonSmall: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonOutline: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonDanger: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: COLORS.error,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonSuccess: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white,
    },

    buttonTextOutline: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },

    // Texto
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primary,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.gray700,
    },

    label: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.gray600,
        marginBottom: 6,
    },

    text: {
        fontSize: 14,
        color: COLORS.gray700,
    },

    textLight: {
        fontSize: 14,
        color: COLORS.gray500,
    },

    textSmall: {
        fontSize: 12,
        color: COLORS.gray500,
    },

    // Inputs
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray300,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: COLORS.gray800,
        backgroundColor: COLORS.white,
        marginVertical: 6,
    },

    inputFocused: {
        borderColor: COLORS.primary,
    },

    // Espaciado
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },

    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    spacerSmall: {
        height: 8,
    },

    spacerMedium: {
        height: 12,
    },

    spacerLarge: {
        height: 16,
    },

    separator: {
        height: 1,
        backgroundColor: COLORS.gray200,
        marginVertical: 12,
    },

    // Estados
    centerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },

    emptyStateText: {
        fontSize: 14,
        color: COLORS.gray500,
        textAlign: 'center',
        marginVertical: 8,
    },

    // Badge
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: COLORS.gray100,
        alignSelf: 'flex-start',
    },

    badgePrimary: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.gray700,
    },

    badgePrimaryText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.white,
    },
});
